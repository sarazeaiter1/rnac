// import React from 'react';
// import { Text, View, Button } from 'react-native';
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import AudioRecorderManager from '../src/js/native-interfaces/AudioRecorderManager';
describe('AudioRecorderManager', () => {
  test('exports', () => {
    expect(AudioRecorderManager).toMatchSnapshot();
  });
});
