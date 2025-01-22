let uploadedFiles = [];

// Switch between Login and Sign-Up forms
document.getElementById('showSignUp').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('uploadContainer').style.display = 'block';
});

// Handle File Upload
document.getElementById('folderUploadForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const files = document.getElementById('folderUpload').files;
    const errorMessage = document.getElementById('uploadErrorMessage');

    if (files.length === 0) {
        errorMessage.textContent = "Please select files to upload.";
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    for (let file of files) {
        uploadedFiles.push(file.name);
    }
    alert("Files uploaded successfully!");
});

// Handle View Files Button
document.getElementById('viewFilesButton').addEventListener('click', function () {
    document.getElementById('uploadContainer').style.display = 'none';
    document.getElementById('viewFilesContainer').style.display = 'block';

    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    if (uploadedFiles.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No files uploaded yet.';
        fileList.appendChild(listItem);
    } else {
        uploadedFiles.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            fileList.appendChild(listItem);
        });
    }
});

// Back to Upload Section
function showUploadContainer() {
    document.getElementById('viewFilesContainer').style.display = 'none';
    document.getElementById('uploadContainer').style.display = 'block';
}




