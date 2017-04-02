import React from 'react';
import hocbox from '../../../lib';

class Title extends React.Component {
  render() {
    return <h1>{ this.props.text }</h1>;
  }
};
Title.defaultProps = {
  text: ''
};

export default hocbox.wire(
  Title,
  ['TitleText'],
  text => ({ text })
);