import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import TodoPage from './pages/TodoPage';
import PostPage from './pages/PostPage';
import AlbumPage from './pages/AlbumPage';

const App: React.FC = () => (
  <IonApp>
    {/* <IonReactRouter> */}
    <IonRouterOutlet>
      <BrowserRouter>
        <Route path="/user/:id/todos" component={TodoPage} />
        <Route path="/user/:id/posts" component={PostPage} />
        <Route path="/user/:id/albums" component={AlbumPage} />
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        {/* <Redirect to="/error" /> */}
      </BrowserRouter>
    </IonRouterOutlet>
    {/* </IonReactRouter> */}
  </IonApp>
);

export default App;
