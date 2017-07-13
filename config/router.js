import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login.js';
import Chat from '../screens/Chat';

export const AppStack = StackNavigator({
  Home: { screen: Login },
  Chat: { screen: Chat},
}, { headerMode: 'none' });