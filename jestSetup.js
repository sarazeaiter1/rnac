jest.mock('./src/js/native-interfaces/AudioRecorderManager.js', () => {
  return {
    prepareRecordingAtPath: async () => {},
    startRecording: async () => {},
    stopRecording: async () => {}
  };
});
