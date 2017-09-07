// import React from 'react';
// import { Text, View, Button } from 'react-native';
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import getNativePrepareRecordingAtPathArguments from '../src/js/native-interfaces/getNativePrepareRecordingAtPathArguments';

describe('getNativePrepareRecordingAtPathArguments', () => {
  test('exports', () => {
    expect(getNativePrepareRecordingAtPathArguments).toMatchSnapshot();
  });
});
