import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import TodoPage from '../pages/TodoPage';
import PostDetailPage from '../pages/PostDetailPage';
import PostPage from '../pages/PostPage';
import AlbumPage from '../pages/AlbumPage';
import Home from '../pages/Home';

const Routing = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/user/:id/todos" component={TodoPage} />
        <Route path="/user/:id/posts/:postId" component={PostDetailPage} exact />
        <Route path="/user/:id/posts" component={PostPage} />
        <Route path="/user/:id/albums" component={AlbumPage} />
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        {/* <Redirect to="/error" /> */}
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routing;
