import React, { Component } from 'react';
import { update, Display } from './Display';

var value = 1;

class App extends Component {
  render() {
    return <Display />;
  }
}

setInterval(() => {
  update({ value: ++value });
}, 1000);

export default App;
