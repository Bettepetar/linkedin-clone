// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { GoogleAuthProvider } from "firebase/auth";
// import { getProvider } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyBdksjPsfpq9AyP9QJiJxr2h8snc_MDaQo",
//     authDomain: "fir-linkedin-clone-14567.firebaseapp.com",
//     projectId: "fir-linkedin-clone-14567",
//     storageBucket: "fir-linkedin-clone-14567.appspot.com",
//     messagingSenderId: "214166510500",
//     appId: "1:214166510500:web:d9726dbcab6d0c12b6bf31"
//   };


  const firebaseConfig = {
    apiKey: "AIzaSyAsqfryObinS70W23sbs3YF1jrOrk5-1gQ",
    authDomain: "dummy-linkedin-clonne.firebaseapp.com",
    projectId: "dummy-linkedin-clonne",
    storageBucket: "dummy-linkedin-clonne.appspot.com",
    messagingSenderId: "536582936677",
    appId: "1:536582936677:web:d88af2d161e93ddf270e8c"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  // const db = firebaseApp.fireStore();
  // const auth = firebase.auth();
  // const storage = firebase.storage;

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const provider = new GoogleAuthProvider();

  // const colRef = collection(db, 'article')

    
  // addDoc(colRef, {
  //   author: {
  //     discription: 'bettepetar@gmail.com',
  //     title: 'my first post',
  //     date: serverTimestamp(),
  //   },
  //   comments: 0,
  //   discription: 'linkedin clone text'
  // }).then(() => console.log('successfuly added to colection')).catch((err) => console.log(err.message, 'Hey'))
  // console.log('hello from firebaseApp config')

  export { auth , provider , storage};
  export default db;