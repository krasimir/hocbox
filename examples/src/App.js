import React, { Component } from 'react';
import hocbox from '../../lib';
import Display from './components/Display';

var value = 1;

hocbox.register({ TitleText: 'Hello world' });


class App extends Component {
  render() {
    return <Display />;
  }
}

setInterval(() => {
  Display.feed({ value: ++value });
}, 1000);

export default App;
