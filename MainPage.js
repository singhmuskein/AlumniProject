'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

class MainPage extends Component {
  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
          <TouchableHighlight style={{backgroundColor: 'yellow', padding: 10}}
                              onPress={this.gotoPersonPage.bind(this)}>
            <Text style={{color: 'green'}}>Go to Person Page</Text>
          </TouchableHighlight>
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

module.exports = MainPage;
