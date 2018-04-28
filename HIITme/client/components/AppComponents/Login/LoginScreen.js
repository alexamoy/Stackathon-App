import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login'
    };
    render() {
        const { navigate } = this.props.navigation;
        let pic = {
            uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/14262-200.png'
        };
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={80}>
                <View style={styles.container}>
                    <Image source={pic} style={styles.icon} />
                    <Text style={styles.text}>Login to HIITme</Text>
                    <View style={styles.formContainer}>
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
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Home')} >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
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
        width: 100,
        height: 100,
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
    }
});
