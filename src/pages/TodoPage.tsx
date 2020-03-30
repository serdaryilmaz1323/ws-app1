import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import { UserService } from '../api/services/user.service';
import { ITodo } from '../api/models/todo.model';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import { TodoService } from '../api/services/todo.service';
import TodoList from '../container/TodoList/TodoList';

type State = {
  todoList: ITodo[];
  title: string;
  loading: boolean;
};

const initialState: State = { todoList: [], title: 'Todos', loading: true };

const TodoPage = () => {
  const [state, setState] = useState<State>(initialState);
  const history = useHistory();
  const routeMatch = useRouteMatch<{ id?: string }>();
  const userId = Number(routeMatch.params.id);
  console.log(state);

  useEffect(() => {
    let cancel = false;

    UserService.getUserById(userId).then(user => {
      if (cancel) return;

      if (!user) history.push('/error');

      TodoService.fetchTodoList(userId).then(response => {
        if (cancel) return;

        setState({ ...state, todoList: response, title: `Todos of ${user?.name}`, loading: false });
      });
    });

    return () => {
      cancel = true;
    };
    //eslint-disable-next-line
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{state.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TodoList />
      </IonContent>
    </IonPage>
  );
};

export default TodoPage;
