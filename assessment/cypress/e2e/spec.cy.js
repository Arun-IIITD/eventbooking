
describe('Event', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // Adjust the URL to match your application
  });

  it('should render state and city dropdown selectors correctly', () => {
    cy.get('div#state').should('be.visible'); // Verify the State dropdown is present
    cy.get('div#city').should('be.visible'); // Verify the City dropdown is present
  });

  it('should successfully fetch and display events when state and city are selected', () => {
    cy.intercept('GET', 'https://eventdata.onrender.com/events?state=Texas&city=Austin', {
      fixture: 'events.json',
    }).as('getEvents');
  
    cy.get('div#state').click(); // Open state dropdown
    cy.contains('li', 'Texas', { timeout: 5000 }).click(); // Wait for state options to load and select Texas
  
    cy.get('div#city').click(); // Open city dropdown
    cy.contains('li', 'Austin', { timeout: 5000 }).click(); // Wait for city options to load and select Austin
  
    cy.get('#searchBtn').should('contain.text', 'Search').click(); // Click the search button
    cy.wait('@getEvents');
    cy.get('h1').should('contain.text', '2 events available in Austin');
  });
  

  it('should display event booking options when an event card is clicked', () => {
    cy.intercept('GET', 'https://eventdata.onrender.com/events?state=Texas&city=Austin', {
      fixture: 'events.json', // Use a mock JSON response file
    }).as('getEvents');

    cy.get('div#state') // Replace with the selector for the state dropdown
    .click();
    cy.contains('li', 'Texas') // Replace with a valid state option
    .click();
    cy.get('div#city')
    .click();
    cy.contains('li', 'Austin') // Replace with a valid city option
    .click();

    cy.get('#searchBtn').should('contain.text', 'Search').click(); // Click the search button

    cy.wait('@getEvents');
    cy.get('button').contains('Book FREE Event').should('be.visible');
  });
  
  it('should provide date and time selection options for event booking', () => {
    cy.intercept('GET', 'https://eventdata.onrender.com/events?state=Texas&city=Austin', {
      fixture: 'events.json', // Use a mock JSON response file
    }).as('getEvents');

    cy.get('div#state') // Replace with the selector for the state dropdown
    .click();
    cy.contains('li', 'Texas') // Replace with a valid state option
    .click();
    cy.get('div#city')
    .click();
    cy.contains('li', 'Austin') // Replace with a valid city option
    .click();

    cy.get('#searchBtn').should('contain.text', 'Search').click(); // Click the search button

    cy.wait('@getEvents');
    cy.get('button').contains('Book FREE Event')
    .click();
    cy.get('p').contains('Today')
    cy.get('p').contains('Morning')
    cy.get('p').contains('Afternoon')
    cy.get('p').contains('Evening')
  });
  
  it('should render the My Bookings page with header correctly', () => {
    // Navigate to the "My Bookings" page
    cy.visit('http://localhost:3000/my-bookings'); // Replace with the actual URL for the My Bookings page
    cy.get('h1').contains('My Bookings')
  });


  it('should maintain event booking data in localStorage across page refreshes', () => {
    const mockBookings = [
      {
        "eventName": "Food Expo",
        "rating": 4,
        "address": "555 Main St, Austin, Texas",
        "city": "Austin",
        "state": "Texas",
        "bookingDate": "2025-03-27T18:30:00.000Z",
        "bookingTime": "07:00 PM",
        "bookingEmail": "hello@gmail.com"
      },
    ];
  
    cy.window().then((win) => {
      win.localStorage.setItem('bookings', JSON.stringify(mockBookings));
    });
  
    cy.visit('http://localhost:3000/my-bookings'); // Replace with actual My Bookings URL
  
    cy.get('h3')
      .contains('Food Expo', { timeout: 5000 })
      .should('be.visible');
  
    cy.reload();
    cy.get('h3')
      .contains('Food Expo', { timeout: 5000 })
      .should('be.visible');
  });
  

  
});

