import defaultRecordingOptions from '../src/js/constants/defaultRecordingOptions';
import nativeAppEventNames from '../src/js/constants/nativeAppEventNames';

describe('constants', () => {
  test('defaultRecordingOptions', () => {
    expect(defaultRecordingOptions).toMatchSnapshot();
  });
  test('nativeAppEventNames', () => {
    expect(nativeAppEventNames).toMatchSnapshot();
  });
});
