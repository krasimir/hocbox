import React from 'react';
import hocbox from '../../../lib';

class Message extends React.Component {
  render() {
    return <p>{ this.props.text }</p>;
  }
}

export default hocbox.feed(Message);