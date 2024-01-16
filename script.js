const apiUrl = "http://api.login2explore.com:5577/api/iml";

document.addEventListener("DOMContentLoaded", function() {
    initializeForm();
});

function initializeForm() {
    // Fetch data from the JSON Power DB using the provided API and token
    fetch(apiUrl + "/data/read/STUDENT-TABLE", {
        headers: {
            Authorization: "Bearer 90931815|-31949306733606080|90963194"
        }
    })
    .then(response => response.json())
    .then(data => {
        
        if (data && data.data && data.data.length > 0) {
            // Populate the form with the first student's data
            populateForm(data.data[0]);
            enableUpdateResetButtons();
        } else {
            // Enable Save and Reset buttons for a new entry
            enableSaveResetButtons();
        }
    })
    .catch(error => console.error("Error fetching data:", error));
}

function saveData() {
    // Validate form data
    const formData = getFormData();
    if (!isValidFormData(formData)) {
        alert("Please fill in all fields.");
        return;
    }

    // Save data to the JSON Power DB 
    fetch(apiUrl + "/data/write/STUDENT-TABLE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 90931815|-31949306733606080|90963194"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data saved:", data);
        initializeForm();
    })
    .catch(error => console.error("Error saving data:", error));
}

function updateData() {
    // Validate form data
    const formData = getFormData();
    if (!isValidFormData(formData)) {
        alert("Please fill in all fields.");
        return;
    }

    // Update data in the JSON Power DB using the provided API and token
    fetch(apiUrl + "/data/update/STUDENT-TABLE", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 90931815|-31949306733606080|90963194"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data updated:", data);
        initializeForm();
    })
    .catch(error => console.error("Error updating data:", error));
}

function resetForm() {
    // Reset the form to its initial state
    initializeForm();
}

function getFormData() {
    return {
        "Roll-No": document.getElementById("rollNo").value,
        "Full-Name": document.getElementById("fullName").value,
        "Class": document.getElementById("class").value,
        "Birth-Date": document.getElementById("birthDate").value,
        "Address": document.getElementById("address").value,
        "Enrollment-Date": document.getElementById("enrollmentDate").value
    };
}

function populateForm(data) {
    document.getElementById("rollNo").value = data["Roll-No"];
    document.getElementById("fullName").value = data["Full-Name"];
    document.getElementById("class").value = data["Class"];
    document.getElementById("birthDate").value = data["Birth-Date"];
    document.getElementById("address").value = data["Address"];
    document.getElementById("enrollmentDate").value = data["Enrollment-Date"];
}

function isValidFormData(formData) {
    for (const key in formData) {
        if (formData[key].trim() === "") {
            return false;
        }
    }
    return true;
}

function enableSaveResetButtons() {
    document.querySelector("button[onclick='saveData']").disabled = false;
    document.querySelector("button[onclick='updateData']").disabled = true;
    document.querySelector("button[onclick='resetForm']").disabled = false;
}

function enableUpdateResetButtons() {
    document.querySelector("button[onclick='saveData']").disabled = true;
    document.querySelector("button[onclick='updateData']").disabled = false;
    document.querySelector("button[onclick='resetForm']").disabled = false;
}
