import { ITodo } from '../../api/models/todo.model';
import { Reducer } from 'typesafe-actions';
import { TodoActionFuncType, TodoActionType } from './action';

export type TodoStateType = {
  error: string | null;
  loading: boolean;
  todos: ITodo[];
};

const initialState: TodoStateType = {
  error: null,
  loading: false,
  todos: [],
};

export const todoReducer: Reducer<TodoStateType, TodoActionFuncType> = (
  state = initialState,
  action,
): TodoStateType => {
  switch (action.type) {
    case TodoActionType.GET_LIST: {
      return { ...state, loading: true, todos: [], error: null };
    }
    case TodoActionType.GET_LIST_SUCCESS: {
      const { todos } = action.payload;
      return { ...state, loading: false, todos: [...todos], error: null };
    }
    case TodoActionType.GET_LIST_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, todos: [], error: message };
    }
    case TodoActionType.TOGGLE_COMPLETED: {
      const { id } = action.payload;
      const todos = [...state.todos];
      const index = todos.findIndex(t => t.id === id);
      if (index !== -1) {
        todos[index].completed = !todos[index].completed;
      }

      return { ...state, todos: [...todos] };
    }

    default:
      return { ...state };
  }
};
