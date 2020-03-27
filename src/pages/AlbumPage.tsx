import React, { useState, useEffect, Fragment } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonModal,
  IonCol,
  IonSearchbar,
} from '@ionic/react';
import Loading from '../components/Loading';
import AlbumListItem from '../container/AlbumList/AlbumListItem';
import { IAlbum } from '../api/models/album.model';
import { useRouteMatch, useHistory } from 'react-router';
import { UserService } from '../api/services/user.service';
import { AlbumService } from '../api/services/album.service';
import PhotoList from '../container/AlbumList/PhotoList';
import GridLayout from '../layout/GridLayout';

type State = {
  albumList: IAlbum[];
  title: string;
  loading: boolean;
  openModal: boolean;
  selectedAlbumId?: number;
  searchTerm: string;
};

const initialState: State = {
  albumList: [],
  title: 'Album',
  loading: true,
  openModal: false,
  selectedAlbumId: undefined,
  searchTerm: '',
};

const AlbumPage = () => {
  const [state, setState] = useState<State>(initialState);
  const history = useHistory();
  const routeMatch = useRouteMatch<{ id?: string }>();
  const userId = Number(routeMatch.params.id);

  useEffect(() => {
    let cancel = false;

    UserService.getUserById(userId).then(user => {
      if (cancel) return;

      if (!user) history.push('/error');

      AlbumService.fetchAlbumList(userId).then(response => {
        if (cancel) return;

        setState({ ...state, albumList: response, title: `Albums of ${user?.name}`, loading: false });
      });
    });

    return () => {
      cancel = true;
    };
    //eslint-disable-next-line
  }, []);

  const handleItemClicked = (id: number) => {
    setState({ ...state, openModal: true, selectedAlbumId: id });
  };

  const closeModal = () => {
    setState({ ...state, openModal: false, selectedAlbumId: undefined });
  };

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
        {state.selectedAlbumId && (
          <IonModal isOpen={state.openModal} onDidDismiss={closeModal}>
            <PhotoList albumId={state.selectedAlbumId} />
          </IonModal>
        )}
        {state.loading ? (
          <Loading />
        ) : (
          <Fragment>
            <IonSearchbar
              value={state.searchTerm}
              onIonChange={e => setState({ ...state, searchTerm: e.detail.value! })}
            ></IonSearchbar>
            <GridLayout>
              <IonCol sizeXs="12" sizeSm="12" sizeMd="11" sizeLg="10" sizeXl="8">
                <IonList>
                  {state.albumList.map(item => {
                    if (item.title.includes(state.searchTerm)) {
                      return (
                        <AlbumListItem key={item.id} album={item} itemClicked={() => handleItemClicked(item.id)} />
                      );
                    }
                  })}
                </IonList>
              </IonCol>
            </GridLayout>
          </Fragment>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AlbumPage;
