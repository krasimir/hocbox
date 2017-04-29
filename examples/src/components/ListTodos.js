import React from 'react';
import { wire } from '../../../lib';

class ListTodos extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      <section>
        <hr />
        { todos.map((todo, i) => <p key={ i }>{ todo }</p>) }
      </section>
    )
  }
}

export default wire(ListTodos, ['store'], store => ({ todos: store.getTodos() }));