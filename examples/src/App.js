import React, { Component } from 'react';
import AddingNewToDo from './components/AddingNewToDo';
import ListTodos from './components/ListTodos';

class App extends Component {
  render() {
    return (
      <div>
        <AddingNewToDo />
        <ListTodos />
      </div>
    );
  }
}

export default App;
