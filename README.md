Submission Validation App
A JavaScript-based web application for validating user inputs, such as email addresses, IP addresses, and domains, using a backend API. This app provides instant feedback to users through modals.

Features
Email Validation: Checks if the entered email address is valid.
IP Address Validation: Verifies the format and existence of an IP address.
Domain Validation: Ensures the entered domain is valid and active.
User-Friendly Interface: Provides real-time feedback using Bootstrap modals.
Error Handling: Displays appropriate error messages for failed validations.
Usage
Validation Features
Email Validation:

Enter an email in the provided input field.
Click "Verify" to check its validity.
IP Address Validation:

Enter an IP address in the IP field.
Click "Verify" to confirm its validity.
Domain Validation:

Provide a domain name in the input field.
Click "Verify" to validate the domain.
API Endpoints
The app interacts with the following backend endpoints:

/validate for email validation.
/ip for IP address validation.
/domain for domain validation.
Ensure the backend is running on http://localhost:3001.

Error Handling
If an error occurs during validation (e.g., invalid input, server issues), the app will display an appropriate error message.

Code Overview
The main functionality is handled by the validateSubmission function, which:

Adds a submit event listener to forms.
Prevents default form submission and validates user input.
Sends a POST request to the corresponding endpoint.
Displays results in a Bootstrap modal.
Key components:

validateSubmission function: Handles form submission and validation.
showModal function: Displays feedback messages in a modal.
