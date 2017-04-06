'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform
} from 'react-native';
var LoginPage = require('./LoginPage');
var MainPage = require('./MainPage');
import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDmmTHFjxZf6Aob_B2IZNoUJNCrmoaxn74",
    authDomain: "alumniproject-b71c2.firebaseapp.com",
    databaseURL: "https://alumniproject-b71c2.firebaseio.com",
    projectId: "alumniproject-b71c2",
    storageBucket: "alumniproject-b71c2.appspot.com",
    messagingSenderId: "1092386708668"
};
firebase.initializeApp(config);
class App extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Navigator
                initialRoute={{id: 'LoginPage', name: 'Index'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    var transition;
                    if(Platform.OS ==='ios'){
                        transition =  Navigator.SceneConfigs.PushFromRight;
                    } else {
                        transition = Navigator.SceneConfigs.FloatFromBottomAndroid;
                    }
                    transition.gestures = null
                    return transition
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
                    navigator={navigator} data={route.data} profileMail={route.profileMail} />
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
