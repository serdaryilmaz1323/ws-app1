import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IUser } from '../../api/models/user.model';

export enum UserActionType {
  GET_LIST = '[user]: GET_LIST',
  GET_LIST_SUCCESS = '[user]: GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[user]: GET_LIST_ERROR',
  SELECT = '[user]: SELECT',
}

export const UserActions = {
  getList: () => action(UserActionType.GET_LIST),
  getListSuccess: (users: IUser[]) => action(UserActionType.GET_LIST_SUCCESS, { users }),
  getListError: (message: string) => action(UserActionType.GET_LIST_ERROR, { message }),
  selectUser: (id: number) => action(UserActionType.SELECT, { id }),
};

export type UserActionFuncType = ActionsUnion<typeof UserActions>;
