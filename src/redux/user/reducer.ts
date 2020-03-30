import { IUser } from '../../api/models/user.model';
import { Reducer } from 'typesafe-actions';
import { UserActionFuncType, UserActionType } from './action';

export type UserStateType = {
  error: string | null;
  loading: boolean;
  users: IUser[];
  selectedUserId?: number;
  selectedUser?: IUser;
};

const initialState: UserStateType = {
  error: null,
  loading: false,
  users: [],
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
      let selectedUser: IUser | undefined = undefined;

      if (state.selectedUserId) {
        selectedUser = users.find(u => u.id === state.selectedUserId);
      }

      return { ...state, loading: false, users: [...users], error: null, selectedUser };
    }
    case UserActionType.GET_LIST_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, users: [], error: message };
    }

    case UserActionType.SELECT: {
      const { id } = action.payload;
      const users = [...state.users];
      let selectedUser: IUser | undefined = undefined;

      if (users.length > 0) {
        selectedUser = users.find(u => u.id === state.selectedUserId);
      }

      return { ...state, selectedUser, selectedUserId: id };
    }

    default:
      return { ...state };
  }
};
