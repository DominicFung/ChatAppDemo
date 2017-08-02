import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Camera from 'react-native-camera';
import axios from 'axios';
const cloudVision = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;

import "../config/settings";

export default class AppCam extends Component {

    constructor(props){
        super(props);

        this.state = {

        };


    }

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
                console.log(response.data.responses[0].textAnnotations[0].description);
            }).catch(function(err){console.error(err)});
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