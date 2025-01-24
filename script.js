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
  folderSpecificUploadContainer.style.display = "none"; // Start hidden
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
  backButton.style.display = "none"; // Start hidden
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

    // Prepend folder icon (📁) to the folder name
    li.textContent = "📁 " + folder;

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
  uploadContainer.style.display = "none"; // Hide the main upload container
  folderSpecificUploadContainer.style.display = "block"; // Show the folder-specific upload container
  backButton.style.display = "block"; // Show the back button
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
    // Store the file object in addition to metadata
    folders[activeFolder].push({ name: file.name, type: file.type, fileObject: file });
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

    // Display file name
    li.textContent = `${file.name}`;
    
    // Add preview based on file type
    const preview = document.createElement("div");
    preview.style.marginTop = "5px";

    if (file.type.startsWith("image/")) {
      // Image preview
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file.fileObject); // Create a preview URL
      img.style.width = "100px";
      img.style.height = "auto";
      img.style.border = "1px solid #ccc";
      img.style.marginRight = "10px";
      preview.appendChild(img);
    } else if (file.type === "text/plain") {
      // Text file preview
      const reader = new FileReader();
      reader.onload = function (e) {
        const textPreview = document.createElement("p");
        textPreview.textContent = e.target.result;
        textPreview.style.fontSize = "12px";
        textPreview.style.color = "#555";
        textPreview.style.marginTop = "5px";
        preview.appendChild(textPreview);
      };
      reader.readAsText(file.fileObject);
    } else {
      // Generic file icon
      const fileIcon = document.createElement("span");
      fileIcon.textContent = "📄";
      fileIcon.style.fontSize = "20px";
      fileIcon.style.marginRight = "10px";
      preview.appendChild(fileIcon);
    }

    li.appendChild(preview);

    // Add download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file.fileObject); // Create a downloadable URL
    downloadLink.download = file.name; // Set the download attribute to the file name
    downloadLink.textContent = "Download";
    downloadLink.style.marginLeft = "10px";
    downloadLink.style.color = "#007BFF";
    downloadLink.style.textDecoration = "underline";

    li.appendChild(downloadLink);

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
  folderSpecificUploadContainer.style.display = "none"; // Hide folder-specific upload container
  uploadContainer.style.display = "block"; // Show the main upload container
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
uploadContainer.style.display = "none"; // Hide the main upload container initially