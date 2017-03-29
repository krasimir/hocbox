import React from 'react';
import hocbox from '../../../lib';

class DisplayBase extends React.Component {
  render() {
    return <p>Value is { this.props.value }</p>;
  }
};
DisplayBase.defaultProps = {
  value: '-'
};

const { feed, Component: Display } = hocbox.feed(DisplayBase);

export { feed, Display };