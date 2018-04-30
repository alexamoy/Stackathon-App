import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import ApiKeys from './constants/ApiKeys';
import * as  firebase from 'firebase';
require('firebase/firestore');
import { Provider } from 'react-redux';
import store from './client/store';
import WelcomeScreen from './client/components/AppComponents/WelcomeScreen';
import LoginScreen from './client/components/AppComponents/Login/LoginScreen';
import StopwatchScreen from './client/components/AppComponents/Timer/StopwatchScreen';
import CreateWorkoutScreen from './client/components/AppComponents/CreateWorkoutScreen';
import HomeScreen from './client/components/AppComponents/HomeScreen';
import WorkoutTimerScreen from './client/components/AppComponents/WorkoutTimerScreen';
import { StackNavigator } from 'react-navigation';
import { Asset, AppLoading } from 'expo';
//Firebase middleware
// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// admin.initializeApp(functions.config(ApiKeys.FirebaseConfig).firebase);

// var db = admin.firestore();

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
    );
  }
}

const AppNavigator = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
    },
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    },
    CreateWorkout: {
      screen: CreateWorkoutScreen
    },
    Stopwatch: {
      screen: StopwatchScreen
    },
    WorkoutTimer: {
      screen: WorkoutTimerScreen
    }
  },
  {
    initialRouteName: 'Welcome'
  }
);
