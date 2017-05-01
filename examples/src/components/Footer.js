import React from 'react';
import { wire, signal } from '../../../lib';

class Footer extends React.Component {
  render() {
    const { all, done } = this.props;
    const latestAddedTodo = this.props['new-todo'];

    return (
      <div className='footer'>
        <span>Done: { `${ done } / ${ all }` }</span>
        <span>Latest: { latestAddedTodo === true ? '...' : latestAddedTodo }</span>
      </div>
    );
  }
}

export default wire(
  signal(Footer, ['new-todo']),
  ['store'],
  store => ({
    all: store.getTodos().length,
    done: store.getTodos().filter(todo => todo.done).length
  })
);