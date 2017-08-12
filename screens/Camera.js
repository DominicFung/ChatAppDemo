import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import Camera from 'react-native-camera';
import axios from 'axios';
const cloudVision = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;

import { setTextFromPic } from "../action/cameraActions";
import "../config/settings";

class AppCam extends Component {

    render() {
        return(
            <View style={styles.container}>
                <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureQuality={Camera.constants.CaptureQuality['720p']}
                captureTarget={Camera.constants.CaptureTarget.memory}
                playSoundOnCapture={false}>
                <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>
            </View>
        );
    }



    takePicture() {

        this.props.onGetText(""); // used to avoid weird error ...

        var a = this.props;
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
        .then((image64) => {


            axios.post(cloudVision, {
                requests: [{
                    image: {content: image64.data},
                    features: [{
                        type: 'TEXT_DETECTION',
                        maxResults: 1
                    }]
                }]
            }).then(function(response){
                a.onGetText(response.data.responses[0].textAnnotations[0].description);
                a.navigation.dispatch(NavigationActions.back());
            }).catch(function(err){console.error(err)});

            console.log("*FROM REDUX******: "+a.info);


        }).catch(err => console.error(err));
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

export default connect((state)=>{
    return { info: state.TextFromPic }
}, (dispatch)=>{
    return{
        onGetText: (text) => {
            dispatch(setTextFromPic(text));
        }
    }
})(AppCam);