import React, { Component } from 'react';
import { feed, Display } from './Display';

var value = 1;

class App extends Component {
  render() {
    return <Display />;
  }
}

setInterval(() => {
  feed({ value: ++value });
}, 1000);

export default App;
