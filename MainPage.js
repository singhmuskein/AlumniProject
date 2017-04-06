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
    ToastAndroid,
    TextInput,
    Platform,
    AlertIOS,
    Keyboard
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
            }),
            suggestionList : false,
            suggestionText : ''
        };
        this.callPressed = this.callPressed.bind(this);
        this.mailPressed = this.mailPressed.bind(this);
        this.messagePressed = this.messagePressed.bind(this);
        this.onNameEntered = this.onNameEntered.bind(this);
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
            <View style={styles.rowView}>
                <View style={styles.rowInnerView}>
                    <View style={{flex :1}}>
                        <Text numberOfLines={1} style={styles.nameText}>{alumnusDetails.fullName}</Text>
                        <Text numberOfLines={1} style={styles.emailText}>{alumnusDetails.emailID}</Text>
                        <Text style={styles.numberText}>{phoneNumberText}</Text>
                    </View>
                    <View style={styles.imagesListView}>
                        <TouchableHighlight underlayColor="#ffffff" onPress={()=> this.callPressed(alumnus)}>
                            {phoneNotAvailable ?
                                <Image style={styles.imageStyle} source={{uri: 'error'}}/>
                                    :
                                <Image style={styles.imageStyle} source={{uri: 'call'}}/>
                            }
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="#ffffff" onPress={()=> this.messagePressed(alumnus)}>
                            {phoneNotAvailable ?
                                <Image style={styles.imageStyle} source={{uri: 'error'}}/>
                                :
                                <Image style={styles.imageStyle} source={{uri: 'message'}}/>
                            }
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="#ffffff" onPress={()=> this.mailPressed(alumnus)}>
                            <Image style={[{marginRight : 24, marginBottom: 4}, styles.imageStyle]} source={{uri: 'mail'}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    callPressed(alumnus){
        let alumnusDetails = alumnus.details;
        let phoneNumber  = alumnusDetails.phoneNumber.toString();
        let phoneNotAvailable = false;
        if(phoneNumber == 0){
            phoneNotAvailable = true;
        }
        if(!phoneNotAvailable){
            Communications.phonecall(phoneNumber, true)
        } else {
            if(Platform.OS === 'ios'){
                AlertIOS.alert(
                    'SNU Alumnus App',
                    'No phone number in Alumni Records'
                );
            } else {
                ToastAndroid.show('No phone number in Alumni Records', ToastAndroid.SHORT);
            }
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
            if(Platform.OS === 'ios'){
                AlertIOS.alert(
                    'SNU Alumnus App',
                    'No phone number in Alumni Records'
                );
            } else {
                ToastAndroid.show('No phone number in Alumni Records', ToastAndroid.SHORT);
            }
        }
    }

    mailPressed(alumnus){
        Communications.email(alumnus.details.emailID, null, null, 'Hi Fellow SNU Alumni','{Your Content Here}\nThanks,\n' + alumnus.details.fullName);
    }

    onNameEntered(text){
        if(text.length>0){
            this.setState({
                suggestionList : true,
                suggestionText : text
            });
            this.searchForPartialMatches(text);
        }
        else{
            this.setState({
                suggestionList : false,
                indexes : [],
                suggestionText : ''
            });
        }
    }

    searchForPartialMatches(text){
        let indexes = [];
        let alumniData = this.props.data;
        for(var i=0; i<alumniData.length; i++){
            if(alumniData[i].details.fullName.toLowerCase().indexOf(text.toLowerCase()) !== -1){
                if(alumniData[i].details.emailID !== this.props.profileMail){
                    indexes.push(alumniData[i]);
                }
            }
        }
        this.setState({
            indexes : indexes
        });
    }

    getDataSource(){
        var alumniData = this.props.data;
        var profileMail = this.props.profileMail;
        if(alumniData){
            if(profileMail){
                var items;
                if(this.state.suggestionList){
                    items = this.state.dataSource.cloneWithRows(this.state.indexes);
                } else {
                    var index = alumniData.findIndex(x => x.details.emailID === profileMail);
                    if(index > -1){
                        alumniData.splice(index, 1);
                    }
                    items = this.state.dataSource.cloneWithRows(alumniData);
                }
                return items;
            }
        }
    }

    render() {
        let dataSource = this.getDataSource();
        return (
            <View style={{flex: 1}}>
                <View style={styles.topBar}>
                    <Text style={styles.headerText}>Alumni List</Text>
                </View>
                <View style={styles.searchBarView}>
                    <Image style={styles.searchIcon} source={{uri: 'search'}}/>
                    <TextInput
                        style={styles.textInputStyle}
                        tintColor={'#c2c2c2'}
                        multiline ={false}
                        editable={true}
                        autoCorrect={false}
                        returnKeyType='search'
                        placeholder = {"Search by name"}
                        keyboardType='default'
                        onChangeText={(text) => this.onNameEntered(text)}
                        placeholderTextColor= {'#c2c2c2'}
                    />
                </View>
                <View style={styles.grayBorder}/>
                <ListView
                    style={styles.listView}
                    dataSource={dataSource}
                    showsVerticalScrollIndicator={false}
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
    headerText : {
      color : '#ffffff',
      fontSize : 18,
      marginLeft : 20,
        ...Platform.select({
            ios : {
                marginTop : 16,
                marginLeft : 20,
            },
            android : {
                marginLeft : 24
            }
        }),
    },
    topBar : {
        ...Platform.select({
           ios : {
               height : 70,
               justifyContent : 'center'
           },
            android : {
                height : 40
            }
        }),
      backgroundColor: '#0067b3'
    },
    imageStyle : {
        height : 24,
        width : 24 ,
        marginLeft : 24
    },
    listView: {
        backgroundColor:'#c2c2c2',
        width: deviceWidth
    },
    searchBarView : {
        flexDirection : 'row',
        marginLeft : 24,
        height : 50,
        width : deviceWidth,
        justifyContent : 'center',
        alignItems: 'center'
    },
    searchIcon : {
        height : 24,
        width : 24
    },
    grayBorder : {
        height : 1,
        width : deviceWidth,
        backgroundColor :'#c2c2c2'
    },
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
    },
    textInputStyle : {
        width : deviceWidth,
        height:50,
        color:'#0067b3',
        fontSize:18
    },
    rowView : {
        backgroundColor : '#ffffff',
        marginBottom : 1,
        height : 110,
        flex:1,
        justifyContent : 'center'
    },
    rowInnerView : {
        flex :1,
        marginLeft : 16,
        flexDirection : 'row'
    },
    imagesListView : {
        flex : 1,
        flexDirection : 'row',
        alignItems :'center',
        justifyContent : 'center'
    }

})


module.exports = MainPage;
