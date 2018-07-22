import ApiKeys from './constants/ApiKeys';
const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');

firebase.initializeApp(ApiKeys)
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;
