import React from 'react';
import { ITodo } from '../api/models/todo.model';
import { IonItem, IonLabel, IonCheckbox } from '@ionic/react';

type Props = { todo: ITodo; toggleChecked: () => void };

const TodoListItem = (props: Props) => {
  const { todo } = props;

  return (
    <IonItem>
      <IonLabel>{todo.title}</IonLabel>
      <IonCheckbox checked={todo.completed} slot="start" onIonChange={props.toggleChecked} />
    </IonItem>
  );
};

export default TodoListItem;
