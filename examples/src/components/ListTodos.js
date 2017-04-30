import React from 'react';
import { wire } from '../../../lib';
import Todo from './Todo';

class ListTodos extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      <div className='todoList'>
        { todos.map(todo => <Todo key={ todo.id} todo={ todo } />) }
      </div>
    )
  }
}

export default wire(ListTodos, ['store'], store => ({ todos: store.getTodos() }));