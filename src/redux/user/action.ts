import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IUser } from '../../api/models/user.model';

export enum UserActionType {
  GET_LIST = '[user]: GET_LIST',
  GET_LIST_SUCCESS = '[user]: GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[user]: GET_LIST_ERROR',
  GET = '[user]: GET',
  GET_SUCCESS = '[user]: GET_SUCCESS',
  GET_ERROR = '[user]: GET_ERROR',
}

export const UserActions = {
  getList: () => action(UserActionType.GET_LIST),
  getListSuccess: (users: IUser[]) => action(UserActionType.GET_LIST_SUCCESS, { users }),
  getListError: (message: string) => action(UserActionType.GET_LIST_ERROR, { message }),
};

export type UserActionFuncType = ActionsUnion<typeof UserActions>;
