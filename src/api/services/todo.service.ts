import axios from 'axios';
import { ITodo } from '../models/todo.model';
// import { TODO_LIST } from '../data/todo.data';

export const TodoService = {
  fetchTodoList: async (userId: number): Promise<ITodo[]> => {
    return await axios
      .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        return response.data.filter(item => item.userId === userId);
      })
      .catch(error => {
        return [];
      });
  },
};
