import './UserList.css';
import React from 'react';
import UserListItem from './components/UserListItem';
import Loading from '../../components/Loading';
import GridLayout from '../../layout/GridLayout';
import { useTypeSelector } from '../../redux/helper/selector.helper';

const UserList = () => {
  const { loading, users: userList } = useTypeSelector(s => s.userState);

  return loading ? (
    <Loading />
  ) : (
    <GridLayout>
      {userList.map(item => (
        <UserListItem key={item.id} user={item} />
      ))}
    </GridLayout>
  );
};

export default UserList;
