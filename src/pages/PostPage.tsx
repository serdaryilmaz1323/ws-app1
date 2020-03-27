import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { UserService } from '../api/services/user.service';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react';
import PostList from '../container/PostList/PostList';

type State = {
  title: string;
};

const initialState: State = { title: 'Posts' };

const PostPage = () => {
  const [state, setState] = useState<State>(initialState);

  const history = useHistory();
  const routeMatch = useRouteMatch<{ id?: string }>();
  const userId = Number(routeMatch.params.id);

  useEffect(() => {
    let cancel = false;

    UserService.getUserById(userId).then(user => {
      if (cancel) return;

      if (!user) history.push('/error');

      setState({ ...state, title: `Posts of ${user?.name}` });
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
        <PostList userId={userId} />
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
