const firebase = require('firebase');

require('firebase/firestore')

const restaurantsList = require('./restaurants.json');

firebase.initializeApp({
    apiKey: "AIzaSyCOSmDPqSMus0vhWgYRJTA-Zv4ZMVODpeM",
    authDomain: "mofood-74dfe.firebaseapp.com",
    projectId: "mofood-74dfe"
}); //initializes firebase database service

var db = firebase.firestore();

const jsonToFireStore = async () => {
    try {
        console.log('initializing Firebase');

        console.log('Firebase was Initialized');

        restaurantsList.restaurants.forEach((restaurant) => {
            db.collection("restaurants").add({
                "id": restaurant.id,
                "name": restaurant.name,
                "description": restaurant.description,
                "location": restaurant.location,
                "phone": restaurant.phone,
                "email": restaurant.email,
                "available": restaurant.available,
                "pickupAvailable": restaurant.pickupAvailable,
                "deliveryAvailable": restaurant.deliveryAvailable,
                "menuItems": restaurant.menuItems
            }).then((doc) => {
                console.log('added document id', doc.id);
            })
        })

        console.log('database was populated');
    } catch (err) {
        console.log('there was an error', err);
    }
};

jsonToFireStore();