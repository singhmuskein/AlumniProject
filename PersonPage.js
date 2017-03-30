'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import * as firebase from "firebase";
var deviceWidth = Dimensions.get('window').width;
class PersonPage extends Component {
  constructor(props){
    super(props);
    this.onBackPressed = this.onBackPressed.bind(this);
    this.onSettingOverFlowPressed = this.onSettingOverFlowPressed.bind(this);
    this.onEditPressed = this.onEditPressed.bind(this);
    this.signUpClicked = this.signUpClicked.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  onBackPressed(){
    this.props.navigator.pop();
  }

  onSettingOverFlowPressed(){
  }

  onEditPressed(){
  }

  componentWillMount(){
    var config = {
      apiKey: "AIzaSyAT9KgBwfUhgtO6OUdh8szx0BQXy7qjGWA",
      authDomain: "alumniproject-11389.firebaseapp.com",
      databaseURL: "https://alumniproject-11389.firebaseio.com",
      storageBucket: "alumniproject-11389.appspot.com",
      messagingSenderId: "186841680874"
    };
    firebase.initializeApp(config);
  }

  async signUpClicked(){
    var status = await this.signup("muskeinsingh93@gmail.com", "hello123");
    console.log("Sign up status", status);
  }

  async signup(email, pass) {
    try {
      await firebase.auth()
          .createUserWithEmailAndPassword(email, pass);
      console.log("Account created");
    } catch (error) {
      console.log(error.toString())
    }
  }

  async login(email, pass) {
    try {
      await firebase.auth()
          .signInWithEmailAndPassword(email, pass);
      console.log("Logged In!");
    } catch (error) {
      console.log(error.toString())
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      // Navigate to login view
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <View style={{flex : 1}}>
          <ScrollView style={{flex : 1}}>
            <View style={styles.topView}>
              <View ref="header" style={styles.headerView}>
                <TouchableHighlight onPress={this.onBackPressed} style={styles.headerButton}>
                  <Image style={styles.headerButtonImage} source={require('./back_arrow_android.png')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onSettingOverFlowPressed} style={styles.headerButton}>
                  <Image style={styles.headerButtonImage} source={require('./more_settings_android.png')}/>
                </TouchableHighlight>
              </View>
              <View style={styles.profileDetailView}>
                <Image style={styles.profilePicture} source={require('./businessman.png')}/>
                <View style={styles.profileTextView}>
                  <Text style={styles.profileNameText}>Muskein Singh</Text>
                  <Text style={styles.profileContactText}>+91 - 9711143711</Text>
                </View>
                <TouchableHighlight onPress={this.onEditPressed} style={styles.editButton}>
                  <Image style={styles.editImage}  source={require('./edit_android.png')}/>
                </TouchableHighlight>
              </View>
              <TouchableHighlight onPress={this.signUpClicked.bind(this)} style={{height : 30, width : 100}}>
                <Text> Sign Up</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
    );
  }
  // gotoNext() {
  //   this.props.navigator.push({
  //     id: 'NoNavigatorPage',
  //     sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
  //   });
  // }
}

const styles = StyleSheet.create({
  topView : {
    flex : 1,
    backgroundColor : '#0067b3',
    height : 300,
  },
  headerView :{
    flexDirection: 'row',
    justifyContent : 'space-between'
  },
  headerButton : {
    marginTop : 16,
    marginLeft : 16
  },
  headerButtonImage : {
    height : 24,
    width :24
  },
  profileDetailView : {
    flex :1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  profilePicture : {
    height : 120,
    width :120,
    marginTop : 24
  },
  profileTextView : {
    flex :1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  profileNameText : {
    color : 'white',
    marginTop : 24,
    fontSize : 24
  },
  profileContactText : {
    color : 'white'
  },
  editButton : {
    position : 'absolute',
    top : 185,
    right : 16,
    marginTop : 16,
    marginRight :16
  },
  editImage : {
    flex : 1 ,
    height : 24,
    width :24
  }

});
module.exports = PersonPage;
