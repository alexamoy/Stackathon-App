import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import LoginScreen from './Login/LoginScreen';

export default class HomeScreen extends Component {
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
                <Button onPress={() => navigate('Login')} title="Get Started" color='#42bff4' style={styles.button} />
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
    }
});


