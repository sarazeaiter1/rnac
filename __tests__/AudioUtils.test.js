// import React from 'react';
// import { Platform } from 'react-native';
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import AudioUtils, {
  getAudioUtils
} from '../src/js/native-interfaces/AudioUtils';
describe('AudioUtils', () => {
  test('exports', () => {
    expect(AudioUtils).toMatchSnapshot();
  });
  test('exports getAudioUtils', () => {
    expect(getAudioUtils).toMatchSnapshot();
  });
  test('exports getAudioUtils callable', () => {
    expect(getAudioUtils()).toMatchSnapshot();
  });
  test('exports getAudioUtils callable android ', () => {
    expect(getAudioUtils('android')).toMatchSnapshot();
  });
});
