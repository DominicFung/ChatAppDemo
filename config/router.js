import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Chat from '../screens/Chat';
import Camera from '../screens/Camera';

export const AppStack = StackNavigator({
  Home: { screen: Login },
  Chat: { screen: Chat},
  Camera: { screen: Camera }
}, { headerMode: 'none' });