import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3P-qr7Mrlg74BQymT7bykV2HYwbU8Gk8",
  authDomain: "amz-clone-medium.firebaseapp.com",
  databaseURL: "https://amz-clone-medium.firebaseio.com",
  projectId: "amz-clone-medium",
  storageBucket: "amz-clone-medium.appspot.com",
  messagingSenderId: "769450879220",
  appId: "1:769450879220:web:cbff61e0ee041531e456a1",
  measurementId: "G-CZDBWXMWF7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };