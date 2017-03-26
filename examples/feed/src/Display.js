import React from 'react';
import { feed } from '../../../lib';

class DisplayBase extends React.Component {
  render() {
    return <p>Value is { this.props.value }</p>;
  }
};
DisplayBase.defaultProps = {
  value: '-'
};

const { update, Component: Display } = feed(DisplayBase);

export { update, Display };