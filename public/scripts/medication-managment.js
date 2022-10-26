const addToSaveButtonElement = document.querySelector('#medication-details button');
const cartBadgeElement = document.querySelector('.nav-items .badge');

async function addMed() {
  const patientId = addToSaveButtonElement.dataset.patientid;
  const csrfToken = addToSaveButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch('/medical/add-medication', {
      method: 'POST',
      body: JSON.stringify({
        patientId: patientId,
        _csrf: csrfToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
  } catch (error) {
    alert('Something went wrong!');
    return;
  }
  
  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  const responseData = await response.json();



  
}

addToSaveButtonElement.addEventListener('click', addMed);