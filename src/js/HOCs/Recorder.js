import React from 'react';
import PropTypes from 'prop-types';

import AudioUtils from '../native-interfaces/AudioUtils';
import AudioRecorder from '../native-interfaces/AudioRecorder';

class RecorderButton extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    recordingOptions: PropTypes.shape({
      SampleRate: PropTypes.number,
      Channels: PropTypes.number,
      AudioEncodingBitRate: PropTypes.number,
      AudioQuality: PropTypes.string,
      AudioEncoding: PropTypes.string
    })
  };
  static defaultProps = {
    children: null,
    onStartRecording: () => null,
    onStopRecording: () => null,
    recordingDirPath: `${AudioUtils.DocumentDirectoryPath}/`,
    recordingPath: 'test.aac',
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
    const { children } = this.props;
    if (!children) return null;
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
    const mergedOptions = {
      ...this.props.recordingOptions,
      ...recordingOptions
    };
    let audioRecorderResponse = null;
    try {
      audioRecorderResponse = await AudioRecorder.startRecording({
        recordingPath: recordingSaveToPath,
        recordingOptions: mergedOptions
      });
    } catch (err) {
      // eslint-disable-next-line
      console.warn('Error in audio recorder start: ' + err.message);
    }

    this.setState({ isRecording: true });
    this.props.onStartRecording({
      recordingPath: recordingSaveToPath,
      recordingOptions: this.props.recordingOptions
    });
    return audioRecorderResponse;
  };
  stopRecording = async () => {
    let audioRecorderResponse = null;
    if (!this.state.isRecording) {
      return null;
    }
    try {
      audioRecorderResponse = await AudioRecorder.stopRecording();
    } catch (err) {
      console.warn('Error in audio recorder stop: ' + err.message);
    }

    this.setState({ isRecording: false });
    this.props.onStopRecording({
      recordingPath: this.props.recordingDirPath + this.props.recordingPath,
      recordingOptions: this.props.recordingOptions
    });
    return audioRecorderResponse;
  };
}

export default RecorderButton;
