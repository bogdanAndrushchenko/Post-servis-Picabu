// const firebase = require('firebase');
//
//
// const firebaseConfig = {
//   apiKey: "AIzaSyBJ6Mgn46XbiUS1h3XaF6hCPvcoq5ABBwM",
//   authDomain: "picadu-ff81c.firebaseapp.com",
//   databaseURL: "https://picadu-ff81c.firebaseio.com",
//   projectId: "picadu-ff81c",
//   storageBucket: "picadu-ff81c.appspot.com",
//   messagingSenderId: "177410581303",
//   appId: "1:177410581303:web:87d27dae97ab6fed3b70b2",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const setUsers = {
  user: null,
  initUser(callback) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (callback) callback();
    });
  },
  logIn(email, password) {
    if (!regExpValidEmail.test(email)) {
      alert('error email');
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/wrong-password') {
          console.log(errMessage);
          alert('error message');
        } else if (errCode === 'auth/user-not-found') {
          alert('catch email');
        } else {
          alert(errMessage);
        }
      });
  },
  logOut() {
    firebase.auth().signOut();
  },
  signUp(email, password, callback) {
    if (!regExpValidEmail.test(email)) {
      alert('error email');
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert('Give your email&password');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.editUser(email.split('@')[0], null, callback);
      })
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/week-password') {
          console.log(errMessage);
          alert('error message');
        } else if (errCode === 'auth/email-already-in-use') {
          alert('catch email');
        } else {
          alert(errMessage);
        }
      });

  },
  editUser(displayName, photoURL, callback) {
    const user = firebase.auth().currentUser;

    if (displayName) {
      if (photoURL) {
        user
          .updateProfile({
            displayName,
            photoURL,
          })
          .then(callback);
      } else {
        user
          .updateProfile({
            displayName,
          })
          .then(callback);
      }
    }
  },

  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      alert('email sent');
    }).catch(err => console.log(err));
  },
};

export default setUsers;
