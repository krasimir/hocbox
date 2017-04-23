import React from 'react';
import hocbox from '../../../lib';

const Button = hocbox.signal(class Button extends React.Component {
  constructor(props) {
    super(props);

    this._counter = 0;
    this._onButtonClicked = this._onButtonClicked.bind(this);
  }
  _onButtonClicked() {
    ++this._counter;
    this.props.dispatch('counter', this._counter);
  }
  render() {
    return (
      <button onClick={ this._onButtonClicked }>click me</button>
    );
  }
});

const DisplayCounter = hocbox.signal(({ counter }) => <p>{ counter }</p>);

class UI extends React.Component {
  render() {
    return (
      <div>
        <Button />
        <br />
        <DisplayCounter counter />
      </div>
    );
  }
}

export default hocbox.signal(UI);