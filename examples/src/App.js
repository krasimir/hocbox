import React, { Component } from 'react';
import hocbox from '../../lib';
import Display from './components/Display';
import Message from './components/Message.js'

var value = 1;

hocbox.register({ TitleText: 'Hello world' });

class App extends Component {
  render() {
    return (
      <div>
        <Display />
        <hr />
        <Message />
        <button onClick={ () => Message.feed({ text: 'It works' }) }>click me</button>
      </div>
    );
  }
}

setInterval(() => {
  Display.feed({ value: ++value });
}, 1000);

export default App;
