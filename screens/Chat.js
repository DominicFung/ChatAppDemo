import React, { Component } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { AppRegistry, StyleSheet, Text, View, TextInput, 
    KeyboardAvoidingView, FlatList, ScrollView } from 'react-native';
import { List, ListItem } from "react-native-elements";

export default class Chat extends Component {

    static navigationOptions = {
        title: 'Chat',
    };

    constructor(props){
        super(props);

        this.state = { 
           open: false,
           connected: false,
           chatText: '',
           chatData: ["hello"]
        };

        this.socket = new WebSocket("ws://192.168.5.117:3000/");
        this.socket.onopen = () => {
           this.setState({connected: true});
           console.log('connected');
        }

        this.socket.onmessage = (e) => {
            console.log(e.data);
            this.setState({
                chatData: this.state.chatData.concat([e.data])
            });
        }
    }

    emit(){
       console.log('pressed!: ' + this.state.chatText)
       if (this.state.connected){
           this.setState(prevState => ({ open: !prevState}))
           this.socket.send(
                JSON.stringify({ name: this.props.name, message: this.state.chatText })
            );
            
       }

       this._textInput.setNativeProps({ text: '' });
       
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{paddingTop: 20}}>
                    Global Chatroom
                </Text>

                <FlatList
                    data={this.state.chatData}
                    renderItem={({ item }) => (
                        <Text>{ item }</Text>
                    )}
                />

                <ScrollView scrollEnabled={false}>
                <KeyboardAvoidingView behavior="padding" style={styles.aroundInput}>
                    <TextInput ref={(inputRef) => { this._textInput = inputRef }}
                    placeholder="Say something cool ..." placeholderTextColor="rgba(49,180,180,0.7)" 
                    style={styles.input} returnKeyType="send" underlineColorAndroid='transparent'
                    onChangeText={(chatText) => this.setState({chatText})} value={this.state.chatText} onSubmitEditing={this.emit.bind(this)}
                    blurOnSubmit={false}
                    />
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
        borderColor: '#87dede',
        borderWidth: 0.5,
        borderRadius: 4,
        paddingHorizontal: 5
        },
    aroundInput: {
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});