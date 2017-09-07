import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import TimeElapsed from '../src/js/HOCs/TimeElapsed';

describe('TimeElapsed', () => {
  test('exports', () => {
    expect(TimeElapsed).toMatchSnapshot();
  });
  test('renders null with no children', () => {
    // const children = () => <View />;
    const tree = renderer.create(<TimeElapsed start={false} />);
    expect(JSON.stringify(tree)).toEqual('null');
  });

  test('renders and accepts children as callable function', () => {
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
    const tree = renderer.create(
      <TimeElapsed start={false}>
        {children}
      </TimeElapsed>
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
      <TimeElapsed start={false}>
        <CompChildren />
      </TimeElapsed>
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
      <TimeElapsed start={false}>
        <CompChildren />
      </TimeElapsed>
    );

    const withFunction = renderer.create(
      <TimeElapsed start={false}>
        {children}
      </TimeElapsed>
    );

    expect(JSON.stringify(withClass)).toEqual(JSON.stringify(withFunction));
  });
  test('test componentWillMount', () => {
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
    const Comp = shallow(
      <TimeElapsed start={true}>
        <Text>
          {10}
        </Text>
      </TimeElapsed>
    );
    Comp.renderer._instance._instance.componentWillMount();
    expect(Comp).toMatchSnapshot();
  });
  test('test componentWillUnmount', () => {
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
    const Comp = shallow(
      <TimeElapsed start={true}>
        <Text>
          {10}
        </Text>
      </TimeElapsed>
    );
    Comp.renderer._instance._instance.timer = setInterval(() => {}, 1000);
    Comp.renderer._instance._instance.componentWillUnmount();
    expect(Comp).toMatchSnapshot();
  });
  test('test componentWillReceiveProps to start counting', () => {
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
    const Comp = shallow(
      <TimeElapsed start={true}>
        <Text>
          {10}
        </Text>
      </TimeElapsed>
    );
    Comp.renderer._instance._instance.props = { start: false };
    Comp.renderer._instance._instance.componentWillReceiveProps({
      start: true
    });
    expect(Comp).toMatchSnapshot();
  });
  test('test componentWillReceiveProps to stop counting', () => {
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
    const Comp = shallow(
      <TimeElapsed start={true}>
        <Text>
          {10}
        </Text>
      </TimeElapsed>
    );
    Comp.renderer._instance._instance.props = { start: true };
    Comp.renderer._instance._instance.componentWillReceiveProps({
      start: false
    });
    expect(Comp).toMatchSnapshot();
  });
});
