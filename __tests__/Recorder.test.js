import React from 'react';
import { Text, View, Button } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Recorder from '../src/js/HOCs/Recorder';

describe('Recorder', () => {
  test('exports', () => {
    expect(Recorder).toMatchSnapshot();
  });
  test('renders null with no children', () => {
    const tree = renderer.create(<Recorder start={false} />);
    expect(JSON.stringify(tree)).toEqual('null');
  });

  test('renders and accepts children as callable function', () => {
    // eslint-disable-next-line react/prop-types
    const children = ({ startRecording, stopRecording, isRecording }) => {
      return (
        <Text>
          {JSON.stringify({
            startRecording,
            stopRecording,
            isRecording
          })}
        </Text>
      );
    };
    const tree = renderer.create(
      <Recorder start={false}>
        {children}
      </Recorder>
    );
    expect(tree).toMatchSnapshot();
  });

  test('renders and accepts children as React Class Component', () => {
    class CompChildren extends React.Component {
      render() {
        // eslint-disable-next-line react/prop-types
        const { secondsElapsed } = this.props;
        return (
          <Text>
            {JSON.stringify({
              secondsElapsed
            })}
          </Text>
        );
      }
    }

    const tree = renderer.create(
      <Recorder start={false}>
        <CompChildren />
      </Recorder>
    );
    expect(tree).toMatchSnapshot();
  });

  test('same ui tree if component or function', () => {
    // eslint-disable-next-line react/prop-types
    const children = ({ secondsElapsed }) => {
      return (
        <Text>
          {JSON.stringify({
            secondsElapsed
          })}
        </Text>
      );
    };

    class CompChildren extends React.Component {
      render() {
        // eslint-disable-next-line react/prop-types
        const { secondsElapsed } = this.props;
        return (
          <Text>
            {JSON.stringify({
              secondsElapsed
            })}
          </Text>
        );
      }
    }

    const withClass = renderer.create(
      <Recorder start={false}>
        <CompChildren />
      </Recorder>
    );

    const withFunction = renderer.create(
      <Recorder start={false}>
        {children}
      </Recorder>
    );

    expect(JSON.stringify(withClass)).toEqual(JSON.stringify(withFunction));
  });
  test('test component will unMount', () => {
    const Comp = shallow(
      <Recorder recordingPath={'test.aac'}>
        {({ isRecording, startRecording, stopRecording }) => {
          return (
            <View>
              <Button
                onPress={() => {
                  if (!isRecording) {
                    return startRecording('test.aac');
                  }
                  return stopRecording();
                }}
                style={{}}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              />
            </View>
          );
        }}
      </Recorder>
    );
    Comp.renderer._instance._instance.componentWillUnmount();
    expect(Comp).toMatchSnapshot();
  });

  test('test on start', () => {
    const Comp = shallow(
      <Recorder recordingPath={'test.aac'}>
        {({ isRecording, startRecording, stopRecording }) => {
          return (
            <View>
              <Button
                onPress={() => {
                  if (!isRecording) {
                    return startRecording('test.aac');
                  }
                  return stopRecording();
                }}
                style={{}}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              />
            </View>
          );
        }}
      </Recorder>
    );
    Comp.renderer._instance._instance.state.isRecording = true;
    Comp.renderer._instance._instance.startRecording();
    expect(Comp).toMatchSnapshot();
  });
  test('test start recording with path', () => {
    const Comp = shallow(
      <Recorder recordingPath={'test.aac'}>
        {({ isRecording, startRecording, stopRecording }) => {
          return (
            <View>
              <Button
                onPress={() => {
                  if (!isRecording) {
                    return startRecording('test.aac');
                  }
                  return stopRecording();
                }}
                style={{}}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              />
            </View>
          );
        }}
      </Recorder>
    );
    Comp.renderer._instance._instance.startRecording('test.aac');
    expect(Comp).toMatchSnapshot();
  });
  test('test start recording with path and configuration', () => {
    const Comp = shallow(
      <Recorder recordingPath={'test.aac'}>
        {({ isRecording, startRecording, stopRecording }) => {
          return (
            <View>
              <Button
                onPress={() => {
                  if (!isRecording) {
                    return startRecording('test.aac');
                  }
                  return stopRecording();
                }}
                style={{}}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              />
            </View>
          );
        }}
      </Recorder>
    );
    Comp.renderer._instance._instance.startRecording('test.aac', {
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
    expect(Comp).toMatchSnapshot();
  });
  test('test stop recording while is recording ', () => {
    const Comp = shallow(
      <Recorder recordingPath={'test.aac'}>
        {({ isRecording, startRecording, stopRecording }) => {
          return (
            <View>
              <Button
                onPress={() => {
                  if (!isRecording) {
                    return startRecording('test.aac');
                  }
                  return stopRecording();
                }}
                style={{}}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              />
            </View>
          );
        }}
      </Recorder>
    );
    Comp.renderer._instance._instance.state.isRecording = true;
    Comp.renderer._instance._instance.stopRecording();
    expect(Comp).toMatchSnapshot();
  });
  test('test stop recording while not recording ', () => {
    const Comp = shallow(
      <Recorder recordingPath={'test.aac'}>
        {({ isRecording, startRecording, stopRecording }) => {
          return (
            <View>
              <Button
                onPress={() => {
                  if (!isRecording) {
                    return startRecording('test.aac');
                  }
                  return stopRecording();
                }}
                style={{}}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              />
            </View>
          );
        }}
      </Recorder>
    );
    Comp.renderer._instance._instance.stopRecording();
    expect(Comp).toMatchSnapshot();
  });
});
