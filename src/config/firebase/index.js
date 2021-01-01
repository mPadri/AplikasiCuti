import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAD9VF2mWA-Qb7fPtsAgfzl7wc5cpl290w',
  authDomain: 'myproject-1fa7b.firebaseapp.com',
  databaseURL: 'https://myproject-1fa7b.firebaseio.com',
  projectId: 'myproject-1fa7b',
  storageBucket: 'myproject-1fa7b.appspot.com',
  messagingSenderId: '5129955728',
  appId: '1:5129955728:web:2cfa14eb1e14e2cf04eb15',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
