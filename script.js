// DOM Elements
const loginContainer = document.getElementById("loginContainer");
const signupContainer = document.getElementById("signupContainer");
const uploadContainer = document.getElementById("uploadContainer");
const createdFoldersList = document.getElementById("createdFoldersList");
const folderSpecificUploadContainer = document.createElement("div"); // Dynamic upload section
const backButton = document.createElement("button"); // Back button for folder navigation

let folders = {}; // Object to store folders and their files
let activeFolder = null; // Currently selected folder

// Initialize folder-specific upload container
function initFolderSpecificUpload() {
  folderSpecificUploadContainer.style.display = "none";
  folderSpecificUploadContainer.innerHTML = `
    <h3 id="activeFolderName"></h3>
    <form id="folderUploadForm">
      <input type="file" id="folderUploadInput" multiple>
      <button type="submit">Upload Files</button>
    </form>
    <ul id="uploadedFilesList"></ul>
  `;
  document.body.appendChild(folderSpecificUploadContainer);

  // Add event listener for file uploads
  folderSpecificUploadContainer
    .querySelector("#folderUploadForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      uploadFilesToActiveFolder();
    });

  // Initialize back button
  backButton.textContent = "Back to Folders";
  backButton.style.display = "none";
  backButton.addEventListener("click", showFolderList);
  folderSpecificUploadContainer.appendChild(backButton);
}

// Show Sign-Up Form
document.getElementById("showSignUp").addEventListener("click", () => {
  loginContainer.style.display = "none";
  signupContainer.style.display = "block";
});

// Show Login Form
document.getElementById("showLogin").addEventListener("click", () => {
  signupContainer.style.display = "none";
  loginContainer.style.display = "block";
});

// Handle folder creation
document.getElementById("createFolderButton").addEventListener("click", () => {
  const folderName = prompt("Enter folder name:");
  if (folderName) {
    if (folders[folderName]) {
      alert("Folder already exists!");
    } else {
      folders[folderName] = [];
      renderFolders();
      alert(`Folder "${folderName}" created.`);
    }
  }
});

// Render folders in the UI
function renderFolders() {
  createdFoldersList.innerHTML = "";
  for (const folder in folders) {
    const li = document.createElement("li");
    li.textContent = folder;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      activeFolder = folder;
      showUploadSectionForFolder(folder);
    });
    createdFoldersList.appendChild(li);
  }
}

// Show the upload section for a specific folder
function showUploadSectionForFolder(folderName) {
  // Hide the main upload container and show the folder-specific upload container
  uploadContainer.style.display = "none";
  folderSpecificUploadContainer.style.display = "block";
  backButton.style.display = "block";
  document.getElementById("activeFolderName").textContent = `Uploading to: ${folderName}`;
  renderUploadedFiles(folderName);
}

// Handle file uploads to the active folder
function uploadFilesToActiveFolder() {
  if (!activeFolder) {
    alert("No folder selected!");
    return;
  }

  const files = folderSpecificUploadContainer.querySelector("#folderUploadInput").files;
  if (files.length === 0) {
    alert("No files selected!");
    return;
  }

  for (const file of files) {
    folders[activeFolder].push({ name: file.name, type: file.type });
  }

  alert(`Uploaded ${files.length} file(s) to folder "${activeFolder}".`);
  renderUploadedFiles(activeFolder);
  folderSpecificUploadContainer.querySelector("#folderUploadInput").value = ""; // Reset file input
}

// Render uploaded files for the current folder
function renderUploadedFiles(folderName) {
  const fileList = folderSpecificUploadContainer.querySelector("#uploadedFilesList");
  fileList.innerHTML = "";

  if (folders[folderName].length === 0) {
    const noFilesMessage = document.createElement("li");
    noFilesMessage.textContent = "No files uploaded in this folder.";
    fileList.appendChild(noFilesMessage);
    return;
  }

  folders[folderName].forEach((file, index) => {
    const li = document.createElement("li");
    li.textContent = `${file.name}`;

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => {
      folders[folderName].splice(index, 1);
      renderUploadedFiles(folderName);
    });

    li.appendChild(deleteButton);
    fileList.appendChild(li);
  });
}

// Show the folder list
function showFolderList() {
  activeFolder = null;
  folderSpecificUploadContainer.style.display = "none";
  uploadContainer.style.display = "block";
}

// Simulate login success
function mockLogin() {
  loginContainer.style.display = "none";
  uploadContainer.style.display = "block";
}

// Mock login event (replace with real login handling)
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  mockLogin();
});

// Initialize the dynamic upload section
initFolderSpecificUpload();

// Hide the main upload container initially
uploadContainer.style.display = "none";
