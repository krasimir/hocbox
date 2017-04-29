import { subscribe, invalidate } from '../../../lib';

export default class ToDos {
  constructor() {
    this._todos = [];
    subscribe('new-todo', todo => {
      this._todos.push(todo);
      invalidate();
    });
  }
  getTodos() {
    return this._todos;
  }
};
