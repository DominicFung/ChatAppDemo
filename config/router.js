import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Chat from '../screens/Chat';
import AppCam from '../screens/Camera';

export const AppStack = StackNavigator({
  Home: { screen: Login },
  Chat: { screen: Chat},
  Camera: { screen: AppCam }
}, { headerMode: 'none' });