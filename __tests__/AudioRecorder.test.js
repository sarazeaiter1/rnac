// import React from 'react';
// import { Text, View, Button } from 'react-native';
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import AudioRecorder from '../src/js/native-interfaces/AudioRecorder';

describe('Recorder', () => {
  test('exports', () => {
    expect(AudioRecorder).toMatchSnapshot();
  });
  test('init', () => {
    AudioRecorder.init({
      onRecordingProgress: null,
      onRecordingFinished: null
    });
    expect(AudioRecorder).toMatchSnapshot();
  });

  test('destroy', () => {
    AudioRecorder.startRecording('test.aac', {
      recordingPath: 'et3/',
      recordingOptions: {
        SampleRate: 44100.0,
        Channels: 2,
        AudioQuality: 'High',
        AudioEncoding: 'ima4',
        OutputFormat: 'mpeg_4',
        MeteringEnabled: false,
        AudioEncodingBitRate: 32000
      }
    });
    AudioRecorder.destroy();
    expect(AudioRecorder).toMatchSnapshot();
  });
  test('pauseRecording', () => {
    try {
      AudioRecorder.pauseRecording();
    } catch (err) {
      expect(AudioRecorder).toMatchSnapshot();
    }
  });
  test('removeListeners recordingProgressSubscription', () => {
    AudioRecorder.bindNativeEventListeners();
    AudioRecorder.removeListeners();
    expect(AudioRecorder).toMatchSnapshot();
  });
});
