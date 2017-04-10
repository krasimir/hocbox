import React from 'react';
import hocbox from '../../../lib';

const Title = function({ text }) {
  return <h1>{ text }</h1>;
}

export default hocbox.wire(
  Title,
  ['TitleText'],
  text => ({ text })
);