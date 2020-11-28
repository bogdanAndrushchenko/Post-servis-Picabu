
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import setUsers from "./setUsers.js";


const firebaseConfig = {
  apiKey: "AIzaSyBJ6Mgn46XbiUS1h3XaF6hCPvcoq5ABBwM",
  authDomain: "picadu-ff81c.firebaseapp.com",
  databaseURL: "https://picadu-ff81c.firebaseio.com",
  projectId: "picadu-ff81c",
  storageBucket: "picadu-ff81c.appspot.com",
  messagingSenderId: "177410581303",
  appId: "1:177410581303:web:87d27dae97ab6fed3b70b2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const setPost = {
  allPosts: [

  ],
  addPosts(title, text, tags, callback) {
    const user = firebase.auth().currentUser;

    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title,
      text,
      tags: tags.split(",").map((item) => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL,
      },
      date: new Date().toLocaleDateString(),
      like: 0,
      coment: 0,
    });
    firebase
      .database()
      .ref("post")
      .set(this.allPosts)
      .then(() => this.getPost(callback));
  },
  getPost(callback) {
    firebase
      .database()
      .ref("post")
      .on("value", (snapshot) => {
        this.allPosts = snapshot.val() || [];
        callback();
      });
  },
};
export default setPost;
