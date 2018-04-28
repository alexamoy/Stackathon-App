import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Button } from 'react-native';
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
        console.log('this.state', this.state.intervalTime);
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={80}>
                <View style={styles.container}>
                    <Text style={styles.header}>Customize your workout!</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.options}>
                            <Text style={styles.left}>Interval Time</Text>
                            <View style={styles.selectionContainer}>
                                <TextInput style={styles.right} defaultValue={this.state.intervalTime.toString()} />

                            </View>
                        </View>
                        <View style={styles.options}>
                            <Text style={styles.left}>Number of Sets</Text>
                            <View style={styles.selectionContainer}>
                                <TextInput style={styles.right} defaultValue={this.state.sets.toString()} />

                            </View>
                        </View>
                        <View style={styles.options}>
                            <Text style={styles.left}>Total Set Time</Text>
                            <View style={styles.selectionContainer}>
                                <TextInput style={styles.right} defaultValue={(this.state.intervalTime * this.state.exercises.length).toString()} />

                            </View>
                        </View>
                        <View style={styles.options}>
                            <Text style={styles.left}>Rest</Text>
                            <View style={styles.selectionContainer}>
                                <TextInput style={styles.right} defaultValue={this.state.restTime.toString()} />
                            </View>
                        </View>
                        <View style={styles.options}>
                            <Text style={styles.left}>Exercises</Text>
                            <View style={styles.selectionContainer}>
                                {this.state.exercises.map(exercise => {
                                    <TextInput style={styles.right} defaultValue={exercise} />
                                })} />
                            </View>
                        </View>
                        <View style={styles.options}>
                            <Text style={styles.left}>Total Workout Time</Text>
                            <View style={styles.selectionContainer}>
                                <TextInput style={styles.right} defaultValue={((this.state.intervalTime * this.state.exercises.length * this.state.sets) + this.state.restTime * (this.state.sets - 1)).toString()} />
                            </View>
                        </View>
                        <View style={styles.buttonContainer} >
                            <TouchableOpacity onPress={() => navigate('Stopwatch')}>
                                <Text style={styles.buttonText}>Create Workout</Text>
                            </TouchableOpacity>
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
        height: 50,
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
        marginTop: 20,
        justifyContent: 'center',
        
    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ffffff',
        borderTopWidth: 2,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 179, 255, .1)',
        margin: 10
    },
    left: {
        color: '#000000',
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'rgb(131, 132, 135)'
    },
    selectionContainer: {
        flexDirection: 'row'
    },
    right: {
        color: '#000000',
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'rgb(131, 132, 135)'
    },
    clear: {
        width: 5,
        height: 5,
        borderRadius: 5,
        fontSize: 5
    }
})