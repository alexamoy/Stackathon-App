import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TestComponent } from './client/components/AppComponents';
import ApiKeys from './constants/ApiKeys';
import * as  firebase from 'firebase';
require('firebase/firestore');
import { Provider } from 'react-redux';
import store from './client/store';

//Firebase middleware
// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// admin.initializeApp(functions.config(ApiKeys.FirebaseConfig).firebase);

// var db = admin.firestore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.text}>Hello World!</Text>
          <TestComponent />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#42bff4',
    fontSize: 50
  }
});
