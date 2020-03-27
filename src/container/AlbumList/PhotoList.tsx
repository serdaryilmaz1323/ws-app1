import React, { useState, useEffect } from 'react';
import { IPhoto } from '../../api/models/album.model';
import { IonGrid, IonRow, IonCol, IonContent, IonSlides, IonSlide } from '@ionic/react';
//import { UserService } from '../../api/services/user.service';
//import { TodoService } from '../../api/services/todo.service';
import { AlbumService } from '../../api/services/album.service';
import './PhotoList.css';

type Props = { albumId: number };
type State = {
  photoList: IPhoto[];
  loading: boolean;
  view: 'grid' | 'slide';
};
const PhotoList = (props: Props) => {
  const [state, setState] = useState<State>({ loading: true, photoList: [], view: 'slide' });

  useEffect(() => {
    let cancel = false;

    AlbumService.fetchPhotoList(props.albumId).then(response => {
      if (cancel) return;

      setState({ ...state, photoList: response, loading: false });
    });

    return () => {
      cancel = true;
    };
    //eslint-disable-next-line
  }, []);

  return state.view === 'grid' ? (
    <IonContent scroll-y={false}>
      <IonGrid>
        <IonRow>
          {state.photoList.map(p => (
            <IonCol key={p.id} size="4">
              <img alt={p.title} src={p.url} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  ) : (
    <IonContent scroll-y={false}>
      <IonSlides pager={true}>
        {state.photoList.map(p => (
          <IonSlide key={p.id}>
            <div className="slide">
              <img alt={p.title} src={p.url} />
              <p>{p.title}</p>
            </div>
          </IonSlide>
        ))}
      </IonSlides>
    </IonContent>
  );
};

export default PhotoList;
