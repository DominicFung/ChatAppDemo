import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import navigation from 'react-navigation';

export default class Login extends Component {

  static navigationOptions = {
    title: 'Login',
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../images/ShennyDominic.jpg')} />
                <Text style={styles.title}>Dom's Demo App</Text>
            </View>
            <View style={styles.formContainer}>
                <StatusBar barStyle="light-content" />
                <TextInput placeholder="email" placeholderTextColor="rgba(49,180,180,0.7)" style={styles.input} returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'/>
                <TextInput placeholder="password" placeholderTextColor="rgba(49,180,180,0.7)" style={styles.input} returnKeyType="go" secureTextEntry
                    ref={(input) => this.passwordInput = input} underlineColorAndroid='transparent'/>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Chat')}>
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