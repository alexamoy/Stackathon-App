import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import store from '../../store/index';
import { ButtonGroup } from 'react-native-elements';


export default class CreateWorkoutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.updateIndex = this.updateIndex.bind(this);
    }
    static navigationOptions = {
        title: 'Your Workout'
    };
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    updateIndex(selectedIndex) {
        this.setState({ selectedIndex });
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={80}>
                <View style={styles.container}>
                    <Text style={styles.header}>Customize your workout!</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.options}>
                            <Text style={styles.left}>Interval Time</Text>
                            <View style={styles.selectionContainer}>
                                <TextInput style={styles.right} defaultValue={this.state.intervalTime} />
                            </View>
                        </View>
                        <Text>Total Set Time: </Text>
                        <Text>Number of Sets: </Text>
                        <Text>Rest Time: </Text>
                        <Text>Exercises: </Text>
                        <Text>Total Workout Time: </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
// <View>
//     <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Stopwatch')}>
//         <Text style={styles.buttonText}>Create Workout</Text>
//     </TouchableOpacity>
// </View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: 10
    },
    header: {
        color: '#42bff4',
        fontSize: 25
    },
    formContainer: {
        width: 350,
        paddingTop: 20
    },
    input: {
        height: 40,
        width: 230,
        backgroundColor: 'rgba(66, 191, 244, .2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgb(0, 179, 255)',
        paddingVertical: 15,
        width: 200,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderColor: 'rgba(176, 178, 176, .6)',
        // borderTopWidth: 2,
        paddingVertical: 4,
        backgroundColor: 'rgba(0, 179, 255, .1)',
    },
    left: {
        color: '#000000',
        fontSize: 15,
        paddingHorizontal: 10,
        color: 'rgb(131, 132, 135)'
    },
    selectionContainer: {
        flexDirection: 'row'
    },
    right: {
        color: '#000000',
        fontSize: 15,
        paddingHorizontal: 10,
        color: 'rgb(131, 132, 135)'
    }
})