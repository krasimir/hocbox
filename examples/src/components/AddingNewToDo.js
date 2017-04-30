import React from 'react';
import { signal } from '../../../lib';

const { Component } = React;
const ENTER = 13;

class AddingNewToDo extends Component {
  constructor(props){
    super(props);

    this.state = { value: '' };
    this._onValueChange = this._onValueChange.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
  }
  componentDidMount() {
    this.refs.inputField.focus();
  }
  _onValueChange(e) {
    this.setState({ value: e.target.value });
  }
  _onKeyUp(e) {
    if (e.keyCode === ENTER && this.state.value !== '') {
      this.props.dispatch('new-todo', this.state.value);
      this.setState({ value: '' });
    }
  }
  render() {
    return (
      <div>
        <input
          type='text'
          ref='inputField'
          placeholder='type a task'
          onChange={ this._onValueChange }
          onKeyUp={ this._onKeyUp }
          value={ this.state.value } />
      </div>
    );
  }
}

export default signal(AddingNewToDo);