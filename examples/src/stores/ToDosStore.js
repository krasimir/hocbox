import { subscribe, invalidate } from '../../../lib';

var ID = 0;
const getNewID = () => ++ID;

export default class ToDos {
  constructor() {
    this._todos = [];
    subscribe({
      'new-todo': todo => {
        this._todos.push({
          id: getNewID(),
          text: todo,
          done: false
        });
        invalidate();
      },
      'mark-as-done': id => {
        const todo = this._todos.find(todo => todo.id === id);

        if (todo) {
          todo.done = true;
          invalidate();
        }
      },
      'mark-as-not-done': id => {
        const todo = this._todos.find(todo => todo.id === id);

        if (todo) {
          todo.done = false;
          invalidate();
        }
      },
      'delete': id => {
        this._todos = this._todos.filter(todo => todo.id !== id);
        invalidate();
      }
    });
  }
  getTodos() {
    return this._todos;
  }
};
