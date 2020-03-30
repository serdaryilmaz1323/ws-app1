import { IUser } from '../../api/models/user.model';
import { Reducer } from 'typesafe-actions';
import { UserActionFuncType, UserActionType } from './action';

export type UserStateType = {
  error: string | null;
  loading: boolean;
  users: IUser[];
  selectedUser: IUser | null;
};

const initialState: UserStateType = {
  error: null,
  loading: false,
  users: [],
  selectedUser: null,
};

export const userReducer: Reducer<UserStateType, UserActionFuncType> = (
  state = initialState,
  action,
): UserStateType => {
  switch (action.type) {
    case UserActionType.GET_LIST: {
      return { ...state, loading: true, users: [], error: null };
    }
    case UserActionType.GET_LIST_SUCCESS: {
      const { users } = action.payload;
      return { ...state, loading: false, users: [...users], error: null };
    }
    case UserActionType.GET_LIST_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, users: [], error: message };
    }

    default:
      return { ...state };
  }
};
