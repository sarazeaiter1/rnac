import React from 'react';

import PropTypes from 'prop-types';

class TimeElapsed extends React.Component {
  state = {
    secondsElapsed: 0
  };
  static propTypes = {
    children: PropTypes.node,
    start: PropTypes.bool
  };
  static defaultProps = {
    start: false
  };

  componentWillMount() {
    if (this.props.start) {
      this.startCounting();
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.start && nextProps.start) {
      this.startCounting();
    } else if (!nextProps.start && this.props.start) {
      this.stopCounting();
    }
  }

  render() {
    const newFreshProps = {
      start: this.props.start,
      secondsElapsed: this.state.secondsElapsed
    };
    if (!this.props.children) return null;

    return typeof this.props.children === 'function'
      ? this.props.children(newFreshProps)
      : React.cloneElement(this.props.children, newFreshProps);
  }

  timer;
  isCountingSeconds = false;
  startCounting = () => {
    this.stopCounting();
    this.timer = setInterval(() => {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    }, 1000);
  };
  stopCounting = () => {
    if (this.timer) clearInterval(this.timer);
    this.setState({
      secondsElapsed: 0
    });
  };
}

export default TimeElapsed;
