import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import store from '../../../store';
import firebase from 'firebase';
import db from '../../../../firestore';

export default class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          email: '',
          password: '',
          error: false
        };
        this.handlePress = this.handlePress.bind(this);
    }
    static navigationOptions = {
        title: 'Signup'
    }
    handlePress = async () => {
      try {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        await db.collection('users').doc(`${newUser.uid}`).set({
          email: this.state.email,
          username: this.state.username
        })
        return this.props.navigation.navigate('Home');
      } catch (err) {
        this.setState({ error: true });
        console.error(err);
      }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={80}>
                <View style={styles.container}>
                    <Image source={require('../../../../assets/images/image.png')} style={styles.icon} />
                    <Text style={styles.text}>Signup</Text>
                    <View style={styles.formContainer}>
                        <StatusBar
                            barStyle='light-content'
                        />
                        <TextInput
                            name='email'
                            style={styles.input}
                            placeholder='email'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={text => this.setState({email: text})}
                            returnKeyType='next' />
                            <TextInput
                            name='username'
                            style={styles.input}
                            placeholder='username'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType='next' />
                        <TextInput
                            name='password'
                            style={styles.input}
                            placeholder='password'
                            secureTextEntry
                            onChangeText={text => this.setState({password: text})}
                            ref={(input) => this.passwordInput = input}
                            returnKeyType='go' />
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.handlePress} >
                            <Text style={styles.buttonText}>SIGNUP</Text>
                        </TouchableOpacity>
                        {
                          this.state.error &&
                          <Text style={styles.errorMessage}>Failed to signup</Text>
                        }
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
    errorMessage: {
      color: 'red'
    }
});
