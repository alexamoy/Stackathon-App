import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import moment from 'moment';

function Timer({ interval }) {
    const duration = moment.duration(interval)
    return (
        <Text style={styles.timer}>
            {duration.minutes()}:{duration.seconds()}.{Math.floor(duration.milliseconds() / 10)}
        </Text>
    )
}
function TimerButtons({ title, color, background }) {
    return (
        <View style={[styles.button, { backgroundColor: background }]}>
            <View style={styles.buttonBorder}>
                <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
            </View>
        </View>
    )
}
export default class TimerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 1234567,
            intervals: [12345, 2345, 3456, 98765]
        }
    }
    static navigationOptions = {
        title: 'Timer'
    };

    render() {
        const { navigate } = this.props.navigation;
        let pic = {
            uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/14262-200.png'
        };
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Timer</Text>
                <Timer interval={this.state.timer} />
                <TimerButtons title='Start' color='rgb(65, 216, 65)' background='#ffffff' />
                </View>
            )
        }
    }
    // <TimerButtons title='Reset' color='rgba(176, 178, 176, .7)' background='#000000' />

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
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
    timer: {
        color: '#000000',
        fontSize: 80,
        fontWeight: '200',
        paddingTop: 40
    },
    button: {
        width: 90,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 30,
        fontWeight: '300',
    },
    buttonBorder: {
        width: 90,
        height: 50,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgb(65, 216, 65)',
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
