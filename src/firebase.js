import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzCD7HWpXS1-opJBMM6AmLIZJ6XLoUhC0",
  authDomain: "fitness-app-e5190.firebaseapp.com",
  projectId: "fitness-app-e5190",
  storageBucket: "fitness-app-e5190.firebasestorage.app",
  messagingSenderId: "533227712675",
  appId: "1:533227712675:web:ed213e09ea447e4559cf16",
  measurementId: "G-4KPJ9PEVRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };