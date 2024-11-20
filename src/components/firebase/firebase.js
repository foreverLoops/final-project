// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRCR1pNKloujnHWee2JCcP_sCNxtAxQhw",
  authDomain: "e-commerce-project-e24b8.firebaseapp.com",
  projectId: "e-commerce-project-e24b8",
  storageBucket: "e-commerce-project-e24b8.firebasestorage.app",
  messagingSenderId: "331896919907",
  appId: "1:331896919907:web:0b8faba710b5aa4f1e6556",
  measurementId: "G-TCQ942NTDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const ghProvider = new GithubAuthProvider();

const googleSignin = async () => {
  try{
    const result = await signInWithPopup(auth,provider);
    const user = result.user;
    console.log("user info", user);
  }catch(error){
    console.error("Error trying to sign in",error);
  }
} 
const githubSignin = async () => {
  try{
    const result = await signInWithPopup(auth,ghProvider);
    const user = result.user;
    console.log("user info", user);
  }catch(error){
    console.error("Error trying to sign in",error);
  }
} 

export {auth, googleSignin, githubSignin, db, storage};