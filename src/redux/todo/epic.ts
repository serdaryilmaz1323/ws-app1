import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import Axios from 'axios';
import { TodoActionType, TodoActions } from './action';
import { ITodo } from '../../api/models/todo.model';

const getList: Epic = actions$ =>
  actions$.pipe(
    filter(isOfType(TodoActionType.GET_LIST)),
    switchMap(async () => {
      try {
        const response = await Axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
        return TodoActions.getListSuccess(response.data);
      } catch (error) {
        return TodoActions.getListError(error.message);
      }
    }),
  );

export const todoEpics = [getList];
