/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
var LoginPage = require('./LoginPage');
var MainPage = require('./MainPage');
var PersonPage = require('./PersonPage');
var NoNavigatorPage = require('./NoNavigatorPage');

class App extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{id: 'LoginPage', name: 'Index'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
            return Navigator.SceneConfigs.FloatFromBottom;
          }} />
        );
    }
    renderScene(route, navigator) {
        var routeId = route.id;
        if (routeId === 'LoginPage') {
            return (
                <LoginPage
                    navigator={navigator} />
            );
        }
        if (routeId === 'MainPage') {
            return (
                <MainPage
                    navigator={navigator} />
            );
        }
        if (routeId === 'PersonPage') {
            return (
                <PersonPage
                    navigator={navigator} />
            );
        }
        if (routeId === 'NoNavigatorPage') {
            return (
                <NoNavigatorPage
                    navigator={navigator} />
            );
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('AlumniProject', () => App);
