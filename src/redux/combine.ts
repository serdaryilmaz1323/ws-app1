import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { userEpics } from './user/epic';
import { userReducer } from './user/reducer';
import { todoEpics } from './todo/epic';
import { todoReducer } from './todo/reducer';

export const rootEpic = combineEpics(...userEpics, ...todoEpics);
export const rootReducer = combineReducers({
  userState: userReducer,
  todoState: todoReducer,
});
