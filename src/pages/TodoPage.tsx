import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import TodoList from '../container/TodoList/TodoList';
import { useTypeSelector } from '../redux/helper/selector.helper';
import { useDispatch } from 'react-redux';
import { UserActions } from '../redux/user/action';

const TodoPage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useTypeSelector(s => s.userState);
  const [title, setTitle] = useState('Todos');
  const routeMatch = useRouteMatch<{ id?: string }>();
  const userId = Number(routeMatch.params.id);

  useEffect(() => {
    if (selectedUser) {
      setTitle(`Todos of ${selectedUser?.name}`);
    } else {
      if (!!userId) {
        dispatch(UserActions.selectUser(userId));
      }
      setTitle('Todos');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TodoList />
      </IonContent>
    </IonPage>
  );
};

export default TodoPage;
