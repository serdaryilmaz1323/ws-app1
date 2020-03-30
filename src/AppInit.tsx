import React, { useEffect } from 'react';
import { IonApp } from '@ionic/react';
import Routing from './router/Routing';
import { useDispatch } from 'react-redux';
import { UserActions } from './redux/user/action';

const AppInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.getList());
    return () => {};
  }, []);

  return (
    <IonApp>
      <Routing />
    </IonApp>
  );
};

export default AppInit;
