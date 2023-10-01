// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKsadv9xFgfYNTwMK4EAY6kUkyBOZy0z4",
  authDomain: "play-volunteer.firebaseapp.com",
  projectId: "play-volunteer",
  storageBucket: "play-volunteer.appspot.com",
  messagingSenderId: "826026242645",
  appId: "1:826026242645:web:85d63ac728ea00f50a1adc",
  measurementId: "G-212163B8GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);