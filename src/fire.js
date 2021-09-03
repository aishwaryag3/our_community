import firebase from "firebase/app";
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyALvI-_EUJa3OUmnXqo65rN_2DVk46_Sx0",
    authDomain: "sample-d56e5.firebaseapp.com",
    projectId: "sample-d56e5",
    storageBucket: "sample-d56e5.appspot.com",
    messagingSenderId: "82661315788",
    appId: "1:82661315788:web:d1152ea6aeaffbc3791e69"
  };
  // Initialize Firebase
 const fire= firebase.initializeApp(firebaseConfig);
 


  export default fire;
  
 