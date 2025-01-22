import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getStorage, ref, uploadBytes, listAll, deleteObject, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEl5f6McfXqF1RKXuS1hdqH1LNAGcNkKk",
  authDomain: "project-fb375.firebaseapp.com",
  databaseURL: "https://project-fb375-default-rtdb.firebaseio.com",
  projectId: "project-fb375",
  storageBucket: "project-fb375.firebasestorage.app",
  messagingSenderId: "427978000876",
  appId: "1:427978000876:web:887080212f6b9166cb58c9"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);