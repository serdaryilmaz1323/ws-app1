import React, { useState, useEffect } from 'react';
import { IPhoto } from '../../api/models/album.model';
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';
//import { UserService } from '../../api/services/user.service';
//import { TodoService } from '../../api/services/todo.service';
import { AlbumService } from '../../api/services/album.service';

type Props = { albumId: number };
type State = {
  photoList: IPhoto[];
  loading: boolean;
};
const PhotoList = (props: Props) => {
  const [state, setState] = useState<State>({ loading: true, photoList: [] });

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

  return (
    <IonContent>
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
  );
};

export default PhotoList;
