import React from 'react';
import hocbox from '../../../lib';

class Display extends React.Component {
  render() {
    return <p>Value is { this.props.value }</p>;
  }
};
Display.defaultProps = {
  value: '-'
};

export default hocbox.feed(Display);