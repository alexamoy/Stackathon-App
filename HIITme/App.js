import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/store';
import WelcomeScreen from './client/components/AppComponents/WelcomeScreen';
import LoginScreen from './client/components/AppComponents/Login/LoginScreen';
import SignupScreen from './client/components/AppComponents/Login/SignupScreen';
import StopwatchScreen from './client/components/AppComponents/Timer/StopwatchScreen';
import CreateWorkoutScreen from './client/components/AppComponents/CreateWorkoutScreen';
import HomeScreen from './client/components/AppComponents/HomeScreen';
import WorkoutTimerScreen from './client/components/AppComponents/WorkoutTimerScreen';
import { StackNavigator } from 'react-navigation';
import { Asset, AppLoading } from 'expo';

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
    Signup: {
      screen: SignupScreen
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
