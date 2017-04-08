import React, { Component } from 'react';
import hocbox from '../../lib';
import Display from './components/Display';
import FeedPlayground from './components/FeedPlayground';

var value = 1;

hocbox.register({ TitleText: 'Hello world' });

class App extends Component {
  render() {
    return (
      <div>
        <Display />
        <hr />
        <FeedPlayground />
      </div>
    );
  }
}

setInterval(() => {
  Display.feed({ value: ++value });
}, 1000);

export default App;
