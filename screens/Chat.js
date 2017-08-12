import React, { Component } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { AppRegistry, StyleSheet, Text, View, TextInput, 
    KeyboardAvoidingView, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { List, ListItem } from "react-native-elements";
import { connect } from 'react-redux';

//scrollEnabled = false : allows clicking on any part of screen to escape keybaord

import { setTextFromPic } from "../action/cameraActions";
import "../config/settings"; //for global

const window = Dimensions.get('window');

class Chat extends Component {

    static navigationOptions = {
        title: 'Chat',
    };

    _keyExtractor = (item, index) => item._id;

    constructor(props){
        super(props);

        this.state = { 
           open: false,
           connected: false,
           chatData: props.navigation.state.params.history
        };

        console.log("$$$$$$$: " + safeJsonStringify(this.props.navigation.state.params.sender));

        this.socket = new WebSocket("ws://"+global._IP_+":"+global._wsPort+"/");
        this.socket.onopen = () => {
           this.setState({connected: true});
           console.log('connected');
        }

        this.socket.onmessage = (e) => {
            console.log(e.data);
            this.setState({
                chatData: this.state.chatData.concat([JSON.parse(e.data)])
            });
        }
    }

    emit(){
       console.log('pressed!: ' + this.props.info)
       if (this.state.connected){
           this.setState(prevState => ({ open: !prevState}))
           this.socket.send(
                JSON.stringify({ name: this.props.navigation.state.params.sender, message: this.props.info})
            );
            
       }

       this._textInput.setNativeProps({ text: '' });
       this.props.setText('');
       
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Text style={{paddingTop: 20}}>
                    Global Chatroom
                </Text>

                <FlatList
                    data={this.state.chatData}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => (
                        <Text>{ JSON.stringify(item) }</Text>
                    )}
                />

                <ScrollView scrollEnabled={false}>
                    <KeyboardAvoidingView behavior="padding" style={styles.aroundInput}>
                        <TextInput ref={(inputRef) => { this._textInput = inputRef }}
                        placeholder="Say something cool ..." placeholderTextColor="rgba(49,180,180,0.7)" 
                        style={styles.input} returnKeyType="send" underlineColorAndroid='transparent'
                        onChangeText={(chatText) => this.props.setText(chatText)} value={this.props.info} onSubmitEditing={this.emit.bind(this)}
                        blurOnSubmit={false}
                        />
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Camera')} >
                            <Text style={styles.buttonText}>Camera</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        flex: 1,
        borderColor: '#87dede',
        borderWidth: 0.5,
        borderRadius: 4,
        paddingHorizontal: 5
    },
    aroundInput: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        width: window.width
    },
    buttonContainer: {
        backgroundColor: '#87dede',
        paddingVertical: 10,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
});

export default connect((state) => {
    console.log(state.TextFromPic);
    return { info: state.TextFromPic }
}, (dispatch)=> {
    return{
        setText: (text) => {
            dispatch(setTextFromPic(text));
        }
    }
})(Chat);