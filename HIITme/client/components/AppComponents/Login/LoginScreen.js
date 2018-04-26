import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import { LoginForm } from './LoginForm';

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
                        <LoginForm navigation={navigate}/>
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
        justifyContent: 'center'
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

});
