import React, { Component } from 'react';
import AddingNewToDo from './components/AddingNewToDo';
import ListTodos from './components/ListTodos';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <AddingNewToDo />
        <ListTodos />
        <Footer new-todo />
      </div>
    );
  }
}

export default App;
