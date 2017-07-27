import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import navigation from 'react-navigation';
import axios from 'axios';

import "../config/router";

export default class Login extends Component {

  static navigationOptions = {
    title: 'Login',
  }

  constructor(props){
    super(props);

    this.state = {
        _username: '<anonymous>',
        _password: ""
    };
  }

  AuthenticateUser(){

    var a = this.props.navigation;

    axios({
        method: 'post',
        baseURL: "http://"+global._IP_+":"+global._exPort,
        url: '/login',
        data: {
            email: this.state._username,
            password: this.state._password
        }
    }).then(function(res){
        console.log(JSON.stringify(res.data));

        if(res.data.loginStatus === 1){
            console.log("username is "+res.data.username);
            a.navigate('Chat', {sender: res.data.username, history: res.data.chatHist});
        } else {
            console.log("no validation");
        }
    });
  };

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../images/ShennyDominic.jpg')} />
                <Text style={styles.title}>Dom's Demo App</Text>
            </View>
            <View style={styles.formContainer}>
                <StatusBar barStyle="light-content" />
                <TextInput placeholder="email" placeholderTextColor="rgba(49,180,180,0.7)" style={styles.input} returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} 
                    onChangeText={(_username) => this.setState({_username})} underlineColorAndroid='transparent'/>
                <TextInput placeholder="password" placeholderTextColor="rgba(49,180,180,0.7)" style={styles.input} returnKeyType="go" secureTextEntry
                    ref={(passRef) => {this.passwordInput = passRef}} onChangeText={(_password) => this.setState({_password})} underlineColorAndroid='transparent'/>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.AuthenticateUser.bind(this)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#afe9e9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 140,
        height: 140,
        borderRadius: 100
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9,
        fontWeight: '500'
    },
    formContainer: {
        padding: 20
    },
    input: {
        height: 40,
        width: 250,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#87dede',
        paddingVertical: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
});