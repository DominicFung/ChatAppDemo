/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//adb logcat *:S ReactNative:V ReactNativeJS:V
//react-native run-android

import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

import { AppStack } from './config/router';
import Login from './screens/Login';
import Chat from './screens/Chat';

export default class demo extends Component {

  render() {
    return <Login />;
  }
}

AppRegistry.registerComponent('demo', () => AppStack);
