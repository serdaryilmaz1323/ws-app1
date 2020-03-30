import { Epic } from 'redux-observable';
import { UserActionType, UserActions, UserActionFuncType } from './action';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import Axios from 'axios';
import { IUser } from '../../api/models/user.model';
import { RootStoreType } from '../store';

const getList: Epic<UserActionFuncType, UserActionFuncType, RootStoreType> = (actions$, state$) =>
  actions$.pipe(
    filter(isOfType(UserActionType.GET_LIST)),
    switchMap(async () => {
      try {
        const response = await Axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
        return UserActions.getListSuccess(response.data);
      } catch (error) {
        return UserActions.getListError(error.message);
      }
    }),
  );

export const userEpics = [getList];
