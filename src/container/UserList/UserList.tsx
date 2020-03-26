import './UserList.css';
import React, { useState, useEffect } from 'react';
import { IonGrid, IonRow } from '@ionic/react';
import { useHistory } from 'react-router';
import { IUser } from '../../api/models/user.model';
import { UserService } from '../../api/services/user.service';
import UserListItem from './components/UserListItem';

type State = {
  userList: IUser[];
};

const initialState: State = { userList: [] };

const UserList = () => {
  const [state, setState] = useState<State>(initialState);
  const history = useHistory();

  useEffect(() => {
    UserService.fetchUserList().then(response => {
      setState({ userList: response });
      console.log(response);
    });
  }, []);

  const goToUserDetail = (id: number) => {
    history.push('/user/' + id);
  };

  return (
    <IonGrid>
      <IonRow>
        {state.userList.map(item => {
          return <UserListItem key={item.id} user={item} clickHandler={() => goToUserDetail(item.id)} />;
        })}
      </IonRow>
    </IonGrid>
  );
};

export default UserList;
