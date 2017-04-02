import React, { Component } from 'react';
import Display from './Display';

var value = 1;

class App extends Component {
  render() {
    return <Display />;
  }
}

setInterval(() => {
  Display.feed({ value: ++value });
}, 1000);

export default App;
