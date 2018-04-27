import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import TimerScreen from '../Timer/TimerScreen';

export class LoginForm extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                />
                <TextInput
                    style={styles.input}
                    placeholder='username or email'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType='next' />
                <TextInput
                    style={styles.input}
                    placeholder='password'
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    returnKeyType='go' />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('TimerScreen')} >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        width: 230,
        backgroundColor: 'rgba(66, 191, 244, .3)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgb(0, 179, 255)',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})