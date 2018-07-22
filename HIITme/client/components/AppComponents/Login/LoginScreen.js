import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import store from '../../../store';
import firebase from 'firebase';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
    };
    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    title: 'Login'
  };
  handlePress = async () => {
    const email = this.state.email;
    const password = this.state.password;
    console.log(this.state)
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      await firebase.auth().signInWithEmailAndPassword(email, password)
      return this.props.navigation.navigate('Home')
    } catch (err) {
      this.setState({ error: true });
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={80}>
        <View style={styles.container}>
          <Image source={require('../../../../assets/images/image.png')} style={styles.icon} />
          <Text style={styles.text}>Login to HIITme</Text>
          <View style={styles.formContainer}>
            <StatusBar
              barStyle='light-content'
            />
            <TextInput
              style={styles.input}
              placeholder='email'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={text => this.setState({email: text})}
              returnKeyType='next' />
            <TextInput
              style={styles.input}
              placeholder='password'
              secureTextEntry
              onChangeText={text => this.setState({password: text})}
              ref={(input) => this.passwordInput = input}
              returnKeyType='go' />
            <TouchableOpacity style={styles.buttonContainer} onPress={this.handlePress} >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text>First time here?</Text>
              <TouchableOpacity onPress={() => navigate('Signup')}>
                <Text style={styles.signupText}>Signup!</Text>
              </TouchableOpacity>
              {
                this.state.error &&
                <Text style={styles.errorMessage}>Incorrect user name or password</Text>
              }
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  text: {
    color: '#42bff4',
    fontSize: 40,
  },
  icon: {
    width: 150,
    height: 150,
    alignItems: 'center'
  },
  formContainer: {
    padding: 20
  },
  input: {
    height: 40,
    width: 230,
    backgroundColor: 'rgba(66, 191, 244, .6)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
    fontWeight: '300',
    borderRadius: 10
  },
  buttonContainer: {
    backgroundColor: 'rgb(0, 179, 255)',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  signupText: {
    color: '#42bff4'
  },
  errorMessage: {
    color: 'red'
  }
});
