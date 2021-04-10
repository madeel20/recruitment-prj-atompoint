import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCPqyqmmgLR5MG4fvVxQbjLrj5AKjNCK88",
    authDomain: "security-checkist.firebaseapp.com",
    projectId: "security-checkist",
    storageBucket: "security-checkist.appspot.com",
    messagingSenderId: "690233108829",
    appId: "1:690233108829:web:cdc23dfd38b9d1a47920b4"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();