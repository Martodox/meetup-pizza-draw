import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

var config = {
    apiKey: "AIzaSyAZigfY803w3I-nGhC4qB0HtxWxfoz0RIk",
    authDomain: "pizza-draw.firebaseapp.com",
    databaseURL: "https://pizza-draw.firebaseio.com",
    projectId: "pizza-draw",
    storageBucket: "pizza-draw.appspot.com",
    messagingSenderId: "1040597154253",
    appId: "1:1040597154253:web:fcb761bdd9b7ecc734ec84"
};


export function useFirebase() {
    return {
        firebase: !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
    }
}