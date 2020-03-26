import './UserList.css';
import React, { useState, useEffect } from 'react';
import { IUser } from '../../api/models/user.model';
import { UserService } from '../../api/services/user.service';
import UserListItem from './components/UserListItem';
import Loading from '../../components/Loading';
import GridLayout from '../../layout/GridLayout';

type State = {
  userList: IUser[];
  loading: boolean;
};

const initialState: State = { userList: [], loading: true };

const UserList = () => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    UserService.fetchUserList().then(response => {
      setState({ userList: response, loading: false });
      console.log(response);
    });
  }, []);

  return state.loading ? (
    <Loading />
  ) : (
    <GridLayout>
      {state.userList.map(item => (
        <UserListItem key={item.id} user={item} />
      ))}
    </GridLayout>
  );
};

export default UserList;
