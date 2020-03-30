import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { userEpics } from './user/epic';
import { userReducer } from './user/reducer';

export const rootEpic = combineEpics(...userEpics);
export const rootReducer = combineReducers({
  userState: userReducer,
});
