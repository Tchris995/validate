function validateSubmission({ formId, inputId, url, messages }) {
  const formElement = document.getElementById(formId);
  if (!formElement) return;
  console.log(formElement);
  

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userValue = document.getElementById(inputId).value.trim();
    console.log(`User input for ${inputId}: ${userValue}`);

    if (!userValue) {
      showModal(`Please enter a value for ${messages}`);
      return;
    }

    const button = e.target.querySelector('button');
    button.textContent = 'Scanning...';
    button.disabled = true;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [inputId]: userValue }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && 
        (data.CleanResult || data.ValidAddress || 
        (data.Location && Object.keys(data.Location).length > 0) || 
        data.ValidDomain)) {
        showModal(`${messages} is valid`);
      } else {
        const errorMessage = data.message || 'Validation failed for unknown reasons';
        showModal(`Validation failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error:', error);
      showModal('An error occurred while validating. Please try again later.');
    } finally {
      button.textContent = 'Verify';
      button.disabled = false;
    }

    document.getElementById(inputId).value = '';
  });
}

function showModal(displayMessage) {
  const modalMessage = document.getElementById('modalBody');
  modalMessage.textContent = displayMessage;

  const responseModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
  responseModal.show();
}

// Validate email form
validateSubmission({
  formId: 'emailForms',
  inputId: 'email',
  url: 'http://localhost:3001/validate',
  messages: 'the email',
});

// Validate IP address form
validateSubmission({
  formId: 'ipForm',
  inputId: 'ip',
  url: 'http://localhost:3001/ip',
  messages: 'the IP Address',
});

// Validate domain form
validateSubmission({
  formId: 'domainForms',
  inputId: 'domain',
  url: 'http://localhost:3001/domain',
  messages: 'the domain',
});
