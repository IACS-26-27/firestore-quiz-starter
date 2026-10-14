import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const quizId = "quiz-1";

const signInButton = document.querySelector("#sign-in");
const quizSection = document.querySelector("#quiz");
const resultsSection = document.querySelector("#results");

signInButton.addEventListener("click", async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  const user = result.user;
  signInButton.hidden = true;
  console.log("Signed in as", user.email);

  // Your code goes below this line. See the README for each step.

});
