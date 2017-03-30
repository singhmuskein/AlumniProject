'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
class LoginPage extends Component {
      constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            passwordText: '',
            showButtonVisibility : false,
            passwordVisibility : false
        };
      this.onEmailTextChange = this.onEmailTextChange.bind(this);
      this.onPasswordTextChange = this.onPasswordTextChange.bind(this);
      this.signInClicked = this.signInClicked.bind(this);
      this.onShowPressed = this.onShowPressed.bind(this);
      this.gotoNext = this.gotoNext.bind(this);
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
        this.gotoNext();
    }

    onShowPressed(){
        this.setState({
            passwordVisibility: true
        });
    }

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Email address</Text>
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
            <View style={{marginLeft : 8}}>
                <Text style={[{marginTop : 5}, styles.labelText]}>Password</Text>
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
                {this.state.showButtonVisibility && !this.state.passwordVisibility ?
                    <TouchableHighlight underlayColor={'#0067b3'} style={styles.showButton} onPress={this.onShowPressed}>
                        <Text style={styles.showStyle}>show</Text>
                    </TouchableHighlight>
                : null}

            </View>
            <TouchableHighlight underlayColor={'#004d84'} style={styles.signIn} onPress={this.signInClicked}>
                <Text style={{color: 'white'}}>SIGN IN</Text>
            </TouchableHighlight>
        </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'MainPage'
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
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
        height : 40,
        width : deviceWidth-100,
        backgroundColor: '#004d84'
    }

})

module.exports = LoginPage;
