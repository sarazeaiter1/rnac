# et3-native-react-native-audio-recorder

HOCs and native utilities to record sound with react-native.

## Installation

```

yarn add et3arraf/et3-native-react-native-audio-recorder#commithash


react-native link react-native-audio-recorder

```


On *iOS* you need to add a usage description to `Info.plist`:

```
<key>NSMicrophoneUsageDescription</key>
<string>This sample uses the microphone to record your speech and convert it to text.</string>
```

On *Android* you need to add a permission to `AndroidManifest.xml`:

```
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

## Usage 

```javascript
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { Recorder, TimeElapsed } from 'react-native-audio-recorder';

export default class RNAudioRecorderExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Recorder>
          {({ isRecording, startRecording, stopRecording }) => {
            return (
              <View>
                <Button
                  onPress={() => {
                    if (!isRecording) {
                      return startRecording('test.aac');
                    }
                    return stopRecording();
                  }}
                  style={styles.instructions}
                  title={isRecording ? 'Stop Recording' : 'Start Recording'}
                />
                <View>
                  <Text style={styles.instructions}> Timer : </Text>
                </View>
                <TimeElapsed start={isRecording}>
                  {({ secondsElapsed }) => {
                    return (
                      <Text style={styles.instructions}>
                        {secondsElapsed}
                      </Text>
                    );
                  }}
                </TimeElapsed>
              </View>
            );
          }}
        </Recorder>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

// AppRegistry.registerComponent(
//   'RNAudioRecorderExample',
//   () => RNAudioRecorderExample
// );
```
