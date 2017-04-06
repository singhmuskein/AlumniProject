'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    ToastAndroid,
    Keyboard,
    Platform
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import firebase from 'firebase';
class LoginPage extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            passwordText: '',
            showButtonVisibility : false,
            passwordVisibility : false,
            alumniData : null,
            showWarning : false,
            warningText : ''
        };
      this.onEmailTextChange = this.onEmailTextChange.bind(this);
      this.onPasswordTextChange = this.onPasswordTextChange.bind(this);
      this.signInClicked = this.signInClicked.bind(this);
      this.onShowPressed = this.onShowPressed.bind(this);
      this.gotoNext = this.gotoNext.bind(this);
      this.isEmail = this.isEmail.bind(this);
      this.isSNUEmail = this.isSNUEmail.bind(this);
      this.authoriseSignIn = this.authoriseSignIn.bind(this);
      this.dataNotReceived = this.dataNotReceived.bind(this);
      this.notAnAlumnusWarning = this.notAnAlumnusWarning.bind(this);
      this.incorrectEmailWarning = this.incorrectEmailWarning.bind(this);
      this.incorrectPasswordWarning = this.incorrectPasswordWarning.bind(this);
      this.openHomePage = this.openHomePage.bind(this);
      this.incorrectSNUEmailWarning = this.incorrectSNUEmailWarning.bind(this);
      }

    async componentWillMount(){
        var databaseRef = await firebase.database().ref();
        if(databaseRef){
            var values = await databaseRef.once('value');
            var alumniData = values.val().alumni;
            this.setState({
                alumniData : alumniData
            });
            if(Platform.OS !== 'ios'){
                ToastAndroid.show('Data Received', ToastAndroid.SHORT);
            }
        }
    }

    shouldComponentUpdate(newProps, newState){
        if(newState.alumniData !== this.state.alumniData){
            return false;
        }
        return true;
    }

    onEmailTextChange(text){
        this.setState({
            emailText: text
        });
    }

    onPasswordTextChange(text){
        let showButtonVisibility = false;
        if(text.length>0){
            showButtonVisibility = true;
        }
        this.setState({
            passwordText: text,
            showButtonVisibility: showButtonVisibility
        });

    }

    signInClicked(){
        if(this.isEmail(this.state.emailText)){
            if(this.isSNUEmail(this.state.emailText)){
                this.authoriseSignIn(this.state.emailText, this.state.passwordText);
            } else {
                this.incorrectSNUEmailWarning();
            }
        } else {
            this.incorrectEmailWarning();
        }
    }

    isSNUEmail(emailText){
        return emailText.endsWith("@snu.edu.in");
    }

    isEmail(emailText){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailText);
    }

    authoriseSignIn(email, password){
        let allAlumniData = this.state.alumniData;
        if(allAlumniData){
            var index = allAlumniData.findIndex(x => x.details.emailID === email);
            if(index > -1 ){
                let alumnusData = allAlumniData[index];
                if(alumnusData.details.password === password){
                    this.openHomePage();
                } else {
                    this.incorrectPasswordWarning();
                }
            } else {
                this.notAnAlumnusWarning();
            }
        } else {
            this.dataNotReceived();
        }
    }

    dataNotReceived(){
        this.setState({
            showWarning : true,
            warningText : 'Connection error. Please connect to Internet to Sign In'
        });
    }

    notAnAlumnusWarning(){
        this.setState({
            showWarning : true,
            warningText : 'Limited to SNU Alumnus only. '
        });
    }

    incorrectPasswordWarning(){
        this.setState({
            showWarning : true,
            warningText : 'Please enter the correct password'
        });
    }

    incorrectEmailWarning(){
        this.setState({
            showWarning : true,
            warningText : 'Please enter a valid email ID'
        });
    }

    openHomePage(){
        this.setState({
            showWarning : false,
            warningText : ''
        });
        Keyboard.dismiss();
        this.gotoNext();
    }

    incorrectSNUEmailWarning(){
        this.setState({
            showWarning : true,
            warningText : 'Please enter a valid SNU email ID'
        });
    }

    onShowPressed(){
        this.setState({
            passwordVisibility: true
        });
    }

  render() {
      let warningText = this.state.showWarning ? this.state.warningText : "";
      let isIOS = false;
      if(Platform.OS === 'ios'){
          isIOS = true;
      }

        return (
        <View style={styles.container}>
            <View style={{marginLeft : 8}}>
                <Text style={styles.labelText}>Email address</Text>
                {isIOS ?
                    <View style={{borderBottomColor: '#ffffff',borderBottomWidth: 1 }}>
                        <TextInput
                            style={styles.textInputStyle}
                            multiline ={false}
                            editable={true}
                            autoCorrect={false}
                            placeholder = {"example@snu.edu.in"}
                            keyboardType='email-address'
                            onChangeText={(text) => this.onEmailTextChange(text)}
                            placeholderTextColor= {'#ffffff'}
                        />
                    </View>
                    :
                    <TextInput
                        style={styles.textInputStyle}
                        tintColor={'#ffffff'}
                        multiline ={false}
                        editable={true}
                        autoCorrect={false}
                        placeholder = {"example@snu.edu.in"}
                        keyboardType='email-address'
                        underlineColorAndroid={"#ffffff"}
                        onChangeText={(text) => this.onEmailTextChange(text)}
                        placeholderTextColor= {'#ffffff'}
                    />
                }

            </View>
            <View style={{marginLeft : 8}}>
                <Text style={[{marginTop : 8}, styles.labelText]}>Password</Text>
                {isIOS ?
                    <View style={{borderBottomColor: '#ffffff',borderBottomWidth: 1 }}>
                        <TextInput
                            style={styles.textInputStyle}
                            multiline ={false}
                            editable={true}
                            autoCorrect={false}
                            secureTextEntry={this.state.passwordVisibility ? false : true}
                            placeholder = {"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                            keyboardType='default'
                            onChangeText={(text) => this.onPasswordTextChange(text)}
                            placeholderTextColor= {'#ffffff'}
                        />
                    </View>
                    :
                    <TextInput
                        style={styles.textInputStyle}
                        tintColor={'#ffffff'}
                        multiline ={false}
                        editable={true}
                        autoCorrect={false}
                        secureTextEntry={this.state.passwordVisibility ? false : true}
                        placeholder = {"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                        keyboardType='default'
                        underlineColorAndroid={"#ffffff"}
                        onChangeText={(text) => this.onPasswordTextChange(text)}
                        placeholderTextColor= {'#ffffff'}
                    />

                }
                {this.state.showButtonVisibility && !this.state.passwordVisibility ?
                    <TouchableHighlight underlayColor={'#0067b3'} style={styles.showButton} onPress={this.onShowPressed}>
                        <Text style={styles.showStyle}>show</Text>
                    </TouchableHighlight>
                : null}

            </View>
            <Text style={styles.warningText}>{warningText}</Text>
            <TouchableHighlight underlayColor={'#004d84'} style={styles.signIn} onPress={this.signInClicked}>
                <Text style={{color: 'white'}}>SIGN IN</Text>
            </TouchableHighlight>
        </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'MainPage',
      data : this.state.alumniData,
      profileMail : this.state.emailText
    });
  }
}

var styles= StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#0067b3'
    },
    labelText : {
        width : deviceWidth-108,
        height:30,
        color:'#ffffff',
        fontSize:16
    },
    warningText : {
        width : deviceWidth-108,
        height:15,
        color:'#ffffff',
        fontSize:12,
        textAlign: 'center'
    },
    textInputStyle : {
        width : deviceWidth-100,
        height:40,
        color:'#ffffff',
        fontSize:16
    },
    showButton : {
        position : 'absolute',
        bottom : 0,
        right: 5,
        height : 30
    },
    showStyle : {
        color:'#ffffff',
        fontSize:12
    },
    signIn : {
        marginTop : 10,
        alignItems: 'center',
        justifyContent: 'center',
        height : 40,
        width : deviceWidth-100,
        backgroundColor: '#004d84'
    }

})

module.exports = LoginPage;
