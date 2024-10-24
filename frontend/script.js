document.addEventListener('DOMContentLoaded', loadPatients); // Load patients on page load

document.getElementById('patientForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const disease = document.getElementById('disease').value; // Get the disease input

    // Send a POST request to the backend
    const response = await fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, disease }), // Include disease in the body
    });

    if (response.ok) {
        $('#successModal').modal('show'); // Show the success modal
        loadPatients(); // Refresh the patient list
    } else {
        alert('Error adding patient');
    }
});

// Function to load patients from the backend
async function loadPatients() {
    const response = await fetch('http://localhost:3000/patients');
    const patients = await response.json();

    const patientsDiv = document.getElementById('patients');
    patientsDiv.innerHTML = ''; // Clear previous entries

    // Display each patient in a Bootstrap card
    patients.forEach(patient => {
        const patientElement = document.createElement('div');
        patientElement.className = 'patient-card'; // Add Bootstrap styling
        patientElement.innerHTML = `
            <h5>Name: ${patient.name}</h5>
            <p>Age: ${patient.age}</p>
            <p>Disease: ${patient.disease}</p> <!-- Display disease -->
            <p>Added On: ${new Date(patient.created_at).toLocaleString()}</p> <!-- Display timestamp -->
        `;
        patientsDiv.appendChild(patientElement);
    });
}

// Function to search patients by name
function searchPatients() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const patientCards = document.querySelectorAll('.patient-card');

    patientCards.forEach(card => {
        const name = card.querySelector('h5').innerText.toLowerCase();
        if (name.includes(input)) {
            card.style.display = ''; // Show card
        } else {
            card.style.display = 'none'; // Hide card
        }
    });
}