# CRIO_SOLUTION_AND_STUB_ONLY_START_MODULE_ONE
# CRIO_SOLUTION_AND_STUB_ONLY_END_MODULE_ONE
#!/bin/sh
# Exit script on error
set -e
 
 
# Read the first line starting with http from submit.txt
USER_LINK_SUBMISSION=$(grep -m 1 '^http' submit.txt)
# Ensure trialing slash is present
USER_LINK_SUBMISSION="${USER_LINK_SUBMISSION%/}/"

# Check if USER_LINK_SUBMISSION is non-empty
if [ -z "$USER_LINK_SUBMISSION" ]; then
    echo "No URL found in submit.txt"
    exit 1
fi
 
cd assessment
rm -rf node_modules
# Update or create .env with USER_LINK_SUBMISSION
echo "USER_LINK_SUBMISSION=$USER_LINK_SUBMISSION" > .env
 
 
# Check if dotenv is installed, otherwise install it
if npm list dotenv | grep -q 'dotenv'; then
    echo "dotenv is already installed."
else
    echo "Installing dotenv..."
    npm install dotenv > /dev/null 2>&1 &
fi
 
npm install
node runCypress.js
 
# Run Python script
python3 process_filtered_logs.py cypressResults.json
 
# Check if assessment_result.json exists
if [ -f "assesment_result.json" ]; then
    cp assesment_result.json ..
    echo "Assessment results generated"
else
    echo "Python script failed!!!"
fi
