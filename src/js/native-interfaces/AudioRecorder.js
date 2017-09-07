import { NativeAppEventEmitter, Platform } from 'react-native';

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
  async startRecording({ recordingPath, recordingOptions }) {
    try {
      if (!recordingState.isRecording) {
        recordingState.isRecording = true;
        this.bindNativeEventListeners();
        const prepareRecordingAtPathArgs = getNativePrepareRecordingAtPathArguments(
          {
            recordingPath,
            recordingOptions: { recordingOptions }
          }
        );
        await AudioRecorderManager.prepareRecordingAtPath(
          prepareRecordingAtPathArgs.recordingPath,
          {
            ...prepareRecordingAtPathArgs.settings
          }
        );

        return AudioRecorderManager.startRecording();
      }
    } catch (err) {
      // eslint-disable-next-line
      console.warn(err);
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
    return Platform.OS === 'ios'
      ? AudioRecorderManager.pauseRecording()
      : this.stopRecording();
  },
  checkAuthorizationStatus: AudioRecorderManager.checkAuthorizationStatus,
  requestAuthorization: AudioRecorderManager.requestAuthorization,
  removeListeners: function() {
    if (nativeEventListeners.recordingProgressSubscription)
      nativeEventListeners.recordingProgressSubscription.remove();
    if (nativeEventListeners.recordingFinishedSubscription)
      nativeEventListeners.recordingFinishedSubscription.remove();
  }
};

export default AudioRecorder;
