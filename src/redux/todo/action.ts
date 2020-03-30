import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { ITodo } from '../../api/models/todo.model';

export enum TodoActionType {
  GET_LIST = '[todo]: GET_LIST',
  GET_LIST_SUCCESS = '[todo]: GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[todo]: GET_LIST_ERROR',
  TOGGLE_COMPLETED = '[todo]: TOGGLE_COMPLETED',
}

export const TodoActions = {
  getList: () => action(TodoActionType.GET_LIST),
  getListSuccess: (todos: ITodo[]) => action(TodoActionType.GET_LIST_SUCCESS, { todos }),
  getListError: (message: string) => action(TodoActionType.GET_LIST_ERROR, { message }),
  toggleCompleted: (id: number) => action(TodoActionType.TOGGLE_COMPLETED, { id }),
};

export type TodoActionFuncType = ActionsUnion<typeof TodoActions>;
