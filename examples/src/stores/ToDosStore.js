import { subscribe, invalidate } from '../../../lib';

var ID = 0;
const getNewID = () => ++ID;

export default class ToDos {
  constructor() {
    this._todos = [{ text: 'hello', done: false, id: 0 }];
    subscribe('new-todo', todo => {
      this._todos.push({
        id: getNewID(),
        text: todo,
        done: false
      });
      invalidate();
    });
    subscribe('mark-as-done', id => {
      const todo = this._todos.find(todo => todo.id === id);

      if (todo) {
        todo.done = true;
        invalidate();
      }
    });
    subscribe('mark-as-not-done', id => {
      const todo = this._todos.find(todo => todo.id === id);

      if (todo) {
        todo.done = false;
        invalidate();
      }
    });
    subscribe('delete', id => {
      this._todos = this._todos.filter(todo => todo.id !== id);
      invalidate();
    });
  }
  getTodos() {
    return this._todos;
  }
};
