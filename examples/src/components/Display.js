import React from 'react';
import hocbox from '../../../lib';
import Title from './Title';

class Display extends React.Component {
  render() {
    return (
      <section>
        <Title />
        <p>Value is { this.props.value }</p>
      </section>
    );
  }
};
Display.defaultProps = {
  value: '-'
};

export default hocbox.feed(Display);