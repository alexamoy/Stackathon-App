import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import store from '../../store';
import { ButtonGroup } from 'react-native-elements';
import CreateWorkoutScreen from './CreateWorkoutScreen';
import StopwatchScreen from './Timer/StopwatchScreen';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.updateIndex = this.updateIndex.bind(this);
    }
    static navigationOptions = {
        title: 'Home'
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
        const { navigate } = this.props.navigation;
        const buttons = ['Create', 'Stopwatch'];
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={80}>
                <View style={styles.container}>
                    <ButtonGroup onPress={this.updateIndex} selectedIndex={this.state.selectedIndex} buttons={buttons} containerStyle={{ height: 40 }} 
                    innerBorderStyle={{color: 'rgb(0, 179, 255)'}}
                    textStyle={{color: 'rgb(0, 179, 255)'}}
                    selectedTextStyle={{color: 'rgb(0, 179, 255)'}}/>
                    {
                        this.state.selectedIndex===0
                        ?
                        <CreateWorkoutScreen />
                        :
                        <StopwatchScreen />
                    }
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
    }
});
