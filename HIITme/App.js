import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TestComponent } from './components/AppComponents';
import ApiKeys from './constants/ApiKeys'; 
import * as  firebase from 'firebase';

export default class App extends React.Component {
  constructor(props){
    super(props) 
    //Initialize firebase
    if(!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig) }; 
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
        <TestComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#42bff4',
    fontSize: 50
  }
});
