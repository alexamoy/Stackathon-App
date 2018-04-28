import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import LoginScreen from './Login/LoginScreen';

export default class WelcomeScreen extends Component {
    static navigationOptions = {
        title: 'HIITme'
    };
    render() {
        const { navigate } = this.props.navigation;
        let pic = {
            uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/14262-200.png'
        };
        return (
            <View style={styles.container}>
                <Image source={pic} style={styles.icon} />
                <Text style={styles.title}>HIITme</Text>
                <Text style={styles.description}>Your not so friendly interval training coach</Text>
                <TouchableOpacity onPress={() => navigate('Login')} style={styles.buttonContainer} >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
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
    title: {
        color: '#42bff4',
        fontSize: 70
    },
    description: {
        color: '#42bff4',
        fontSize: 15,
        opacity: .8
    },
    icon: {
        width: 150,
        height: 150,
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: 'rgb(0, 179, 255)',
        paddingVertical: 7,
        margin: 10,
        width: 100,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});


