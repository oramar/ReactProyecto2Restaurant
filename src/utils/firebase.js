
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBQTO3zmJHRBBDbeN0oTfXxcCUQXv_UAEw",
  //authDomain: "icommerce-46f7a.firebaseapp.com",
  projectId: "icommerce-46f7a",
  storageBucket: "icommerce-46f7a.appspot.com",
  //messagingSenderId: "829978089967",
  appId: "1:829978089967:web:39cae63f49de0c42467e1a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
module.exports = {storage}