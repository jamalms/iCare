const deletePatientButtonElements = document.querySelectorAll('.patient-item button');

async function deletePatient(event) {  
  const buttonElement = event.target;
  const patientId = buttonElement.dataset.patientid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch('/admin/patients-list/' + patientId + '?_csrf=' + csrfToken, {
    method: 'DELETE'
  });

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deletePatientButtonElement of deletePatientButtonElements) {
  deletePatientButtonElement.addEventListener('click', deletePatient);
}