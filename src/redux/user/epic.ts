import { Epic } from 'redux-observable';
import { UserActionType, UserActions } from './action';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import Axios from 'axios';
import { IUser } from '../../api/models/user.model';

const getList: Epic = actions$ =>
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
