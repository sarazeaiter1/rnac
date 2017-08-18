import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

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
});
