'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ListView,
    Dimensions,
    StyleSheet,
    Image,
    ToastAndroid
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Communications from 'react-native-communications';
class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => {
                    // console.log("rowHasChanged", row1 !== row2)
                    return row1 !== row2
                }
            })
        };
        this.callPressed = this.callPressed.bind(this);
        this.mailPressed = this.mailPressed.bind(this);
        this.messagePressed = this.messagePressed.bind(this);
    }

    getDataSource(){
        var alumniData = this.props.data;
        if(alumniData){
            var items = this.state.dataSource.cloneWithRows(alumniData);
            return items;
        }
    }

    renderRow(alumnus){
        let alumnusDetails = alumnus.details;
        let phoneNumber  = alumnusDetails.phoneNumber;
        let phoneNumberText = phoneNumber;
        let phoneNotAvailable = false;
        if(phoneNumber == 0){
            phoneNumberText = "Not available";
            phoneNotAvailable = true;
        }
        return(
            <View style={{backgroundColor : '#ffffff', marginBottom : 1, height : 110, flex:1, justifyContent : 'center'}}>
                <View style={{flex :1, marginLeft : 16, flexDirection : 'row'}}>
                    <View style={{flex :1}}>
                        <Text numberOfLines={1} style={styles.nameText}>{alumnusDetails.fullName}</Text>
                        <Text numberOfLines={1} style={styles.emailText}>{alumnusDetails.emailID}</Text>
                        <Text style={styles.numberText}>{phoneNumberText}</Text>
                    </View>
                    <View style={{flex : 1, flexDirection : 'row', alignItems :'center', justifyContent : 'center'}}>
                        <TouchableHighlight underlayColor="#ffffff" onPress={()=> this.callPressed(alumnus)}>
                            {phoneNotAvailable ?
                                <Image style={{height : 24, width : 24 , marginLeft : 24}} source={require('./error.png')}/>
                                    :
                                <Image style={{height : 24, width : 24 , marginLeft : 24}} source={require('./call.png')}/>
                            }
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="#ffffff" onPress={()=> this.messagePressed(alumnus)}>
                            {phoneNotAvailable ?
                                <Image style={{height : 24, width : 24 , marginLeft : 24}} source={require('./error.png')}/>
                                :
                                <Image style={{height : 24, width : 24 , marginLeft : 24}} source={require('./message.png')}/>
                            }
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="#ffffff" onPress={()=> this.mailPressed(alumnus)}>
                            <Image style={{height : 24, width : 24, marginLeft : 24, marginRight : 24, marginBottom: 4}} source={require('./mail.png')}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    callPressed(alumnus){
        debugger;
        let alumnusDetails = alumnus.details;
        let phoneNumber  = alumnusDetails.phoneNumber.toString();
        let phoneNotAvailable = false;
        if(phoneNumber == 0){
            phoneNotAvailable = true;
        }
        if(!phoneNotAvailable){
            Communications.phonecall(phoneNumber, true)
        } else {
            ToastAndroid.show('No phone number in Alumni Records', ToastAndroid.SHORT);
        }

    }

    messagePressed(alumnus){
        let alumnusDetails = alumnus.details;
        let phoneNumber  = alumnusDetails.phoneNumber.toString();
        let phoneNotAvailable = false;
        if(phoneNumber == 0){
            phoneNotAvailable = true;
        }
        if(!phoneNotAvailable){
            Communications.text(phoneNumber);
        } else {
            ToastAndroid.show('No phone number in Alumni Records', ToastAndroid.SHORT);
        }
    }

    mailPressed(alumnus){
        Communications.email('muskein.singh@flipkart.com',null,null,'My Subject','My body text')
    }

    render() {
        let dataSource = this.getDataSource();
        return (
            <View style={{flex: 1}}>
              <ListView
                  style={{backgroundColor:'#c2c2c2',width: deviceWidth}}
                  dataSource={dataSource}
                  renderRow = {this.renderRow.bind(this)}
              />
            </View>
        );
    }

    gotoPersonPage(){
        this.props.navigator.push({
            id: 'PersonPage',
            name: 'PersonPage',
        });
    }
}

var styles= StyleSheet.create({
    nameText : {
        marginTop : 16,
        fontSize : 16,
        color : '#0067b3'
    },
    emailText : {
        marginTop : 8,
        fontSize : 14
    },
    numberText : {
        marginTop : 8,
        fontSize : 14,
        marginBottom : 8
    }

})


module.exports = MainPage;
