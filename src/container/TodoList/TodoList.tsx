import React, { useEffect } from 'react';
import { useTypeSelector } from '../../redux/helper/selector.helper';
import Loading from '../../components/Loading';
import { IonList } from '@ionic/react';
import TodoListItem from '../../components/TodoListItem';
import { useDispatch } from 'react-redux';
import { TodoActions } from '../../redux/todo/action';

const TodoList = () => {
  const dispatch = useDispatch();
  const { loading, todos: todoList } = useTypeSelector(s => s.todoState);

  useEffect(() => {
    dispatch(TodoActions.getList());
  }, []);

  const handleToggleChecked = (id: number) => {
    dispatch(TodoActions.toggleCompleted(id));
  };

  return loading ? (
    <Loading />
  ) : (
    <IonList>
      {todoList.map(item => (
        <TodoListItem key={item.id} todo={item} toggleChecked={() => handleToggleChecked(item.id)} />
      ))}
    </IonList>
  );
};

export default TodoList;
