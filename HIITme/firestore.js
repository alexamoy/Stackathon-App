import config from './constants/config';
const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');

firebase.initializeApp(config)
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;
