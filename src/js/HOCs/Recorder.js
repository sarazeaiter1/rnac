import React from 'react';

import AudioUtils from '../native-interfaces/AudioUtils';
import AudioRecorder from '../native-interfaces/AudioRecorder';

class RecorderButton extends React.Component {
  static defaultProps = {
    children: null,
    onStartRecording: () => null,
    onStopRecording: () => null,
    recordingDirPath: `${AudioUtils.DocumentDirectoryPath}/`,
    recordingPath: `${AudioUtils.DocumentDirectoryPath}/test.aac`,
    recordingOptions: {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    }
  };
  state = {
    isRecording: false
  };
  componentWillUnmount() {
    AudioRecorder.destroy();
  }

  render() {
    const { startRecording, stopRecording } = this;
    const { isRecording } = this.state;
    return typeof this.props.children === 'function'
      ? this.props.children({ startRecording, stopRecording, isRecording })
      : React.cloneElement(this.props.children, {
          startRecording,
          stopRecording,
          isRecording
        });
  }

  startRecording = async (fileName, startRecordingConfig = {}) => {
    if (this.state.isRecording) {
      return;
    }
    const {
      recordingPath = null,
      recordingOptions = null
    } = startRecordingConfig;

    const recordingSaveToPath =
      recordingPath === null
        ? this.props.recordingDirPath + fileName
        : recordingPath;

    try {
      await AudioRecorder.startRecording({
        recordingPath: recordingSaveToPath,
        recordingOptions: this.props.recordingOptions
      });
    } catch (err) {
      console.warn('Error : ' + err.message);
    }

    this.setState({ isRecording: true });
    this.props.onStartRecording({
      recordingPath: recordingSaveToPath,
      recordingOptions: this.props.recordingOptions
    });
  };
  stopRecording = async () => {
    if (!this.state.isRecording) {
      return;
    }
    await AudioRecorder.stopRecording();
    this.setState({ isRecording: false });
    this.props.onStopRecording({
      recordingPath: this.props.recordingPath,
      recordingOptions: this.props.recordingOptions
    });
  };
}

export default RecorderButton;