import React from 'react';
import { signal } from '../../../lib';

class Todo extends React.Component {
  _markAsDone(id) {
    this.props.dispatch('mark-as-done', id);
  }
  _markAsNotDone(id) {
    this.props.dispatch('mark-as-not-done', id);
  }
  _delete(id) {
    this.props.dispatch('delete', id);
  }
  render() {
    const { text, id, done } = this.props.todo;
    const status = done ?
      <a onClick={ this._markAsNotDone.bind(this, id) }>mark as not done</a> :
      <a onClick={ this._markAsDone.bind(this, id) }>mark as done</a>;

    return (
      <div className='todo'>
        { text }
        <div className='links'>
          { status }
          <a onClick={ this._delete.bind(this, id) }>delete</a>
        </div>
      </div>
    );
  }
}

export default signal(Todo);