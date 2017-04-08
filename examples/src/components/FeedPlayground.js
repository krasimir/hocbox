import React from 'react';
import hocbox from '../../../lib';
import Service from '../Service';

const Component = function({ answer }) {
  return <p>The answer is { answer || '...' }</p>;
};

const UI = hocbox.feed(Component);

Service('/api/get/the/answer').then(data => {
  UI.feed({ answer: data });
});

export default UI;