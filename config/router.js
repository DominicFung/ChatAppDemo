import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login.js';
import Chat from '../screens/Chat';

export const AppStack = StackNavigator({
  Home: { screen: Login },
  Chat: { screen: Chat},
}, { headerMode: 'none' });

global._IP_ = "192.168.5.117";
global._wsPort = "3000";
global._exPort = "3001";