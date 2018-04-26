import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class TestComponent extends Component {
    render() {
        return (
            <Text style={styles.text}>Test Component</Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
      color: '#42bff4',
      fontSize: 50
    }
  });