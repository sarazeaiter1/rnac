import { NativeAppEventEmitter } from 'react-native';

import AudioRecorderManager from './AudioRecorderManager';
import getNativePrepareRecordingAtPathArguments from './getNativePrepareRecordingAtPathArguments';

import nativeAppEventNames from '../constants/nativeAppEventNames';

const nativeEventListeners = {
  recordingProgressSubscription: null,
  recordingFinishedSubscription: null
};

const recordingState = {
  isRecording: false
};

const AudioRecorder = {
  onRecordingProgress: () => null,
  onRecordingFinished: () => null,
  init({ onRecordingProgress, onRecordingFinished }) {
    this.onRecordingProgress = onRecordingProgress;
    this.onRecordingFinished = onRecordingFinished;
  },
  destroy() {
    if (recordingState.isRecording) {
      recordingState.isRecording = false;
      this.stopRecording();
    }
  },
  bindNativeEventListeners() {
    this.unbindNativeEventListeners();
    nativeEventListeners.recordingProgressSubscription = NativeAppEventEmitter.addListener(
      nativeAppEventNames.recordingProgress,
      this.onRecordingProgress
    );
    nativeEventListeners.recordingFinishedSubscription = NativeAppEventEmitter.addListener(
      nativeAppEventNames.recordingFinished,
      this.onRecordingFinished
    );
  },
  unbindNativeEventListeners() {
    if (nativeEventListeners.recordingProgressSubscription !== null) {
      nativeEventListeners.recordingProgressSubscription.remove();
    }
    if (nativeEventListeners.recordingFinishedSubscription !== null) {
      nativeEventListeners.recordingProgressSubscription.remove();
    }
  },
  startRecording({ recordingPath, recordingOptions }) {
    if (!recordingState.isRecording) {
      recordingState.isRecording = true;
      this.bindNativeEventListeners();
      const preparRecordingAtPathArgs = getNativePrepareRecordingAtPathArguments(
        {
          recordingPath,
          recordingOptions: { recordingOptions }
        }
      );
      AudioRecorderManager.prepareRecordingAtPath(...preparRecordingAtPathArgs);
      return AudioRecorderManager.startRecording();
    }
  },
  stopRecording: function() {
    if (recordingState.isRecording) {
      recordingState.isRecording = false;
      this.unbindNativeEventListeners();
      return AudioRecorderManager.stopRecording();
    }
  },
  pauseRecording: function() {
    return AudioRecorderManager.pauseRecording();
  },
  checkAuthorizationStatus: AudioRecorderManager.checkAuthorizationStatus,
  requestAuthorization: AudioRecorderManager.requestAuthorization,
  removeListeners: function() {
    if (this.progressSubscription) this.progressSubscription.remove();
    if (this.finishedSubscription) this.finishedSubscription.remove();
  }
};

export default AudioRecorder;
