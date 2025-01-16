// Switch between Login and Sign Up forms
document.getElementById('showSignUp').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

// Handle Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Skip validation and directly move to the upload form
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('uploadContainer').style.display = 'block';
});


// Handle Sign Up form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('signupErrorMessage');

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.display = 'block';
        return;
    }

    if (!firstName || !lastName || !email || !password) {
        errorMessage.textContent = "All fields are required.";
        errorMessage.style.display = 'block';
        return;
    }

    alert("Sign Up successful!");
    errorMessage.style.display = 'none';
    // Redirect or perform further actions here
});

// Handle Folder Upload form submission
document.getElementById('folderUploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const folderInput = document.getElementById('folderUpload');
    const files = folderInput.files;
    const errorMessage = document.getElementById('uploadErrorMessage');

    if (files.length === 0) {
        errorMessage.textContent = "Please select a folder to upload.";
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    alert("Folder uploaded successfully!");
    // Here you can process the folder/files as needed (e.g., upload to a server)
});


//skip log in
document.getElementById('skipLogin').addEventListener('click', function() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('uploadContainer').style.display = 'block';
});
