import React from 'react';
import { IonItem, IonLabel, IonIcon } from '@ionic/react';
import { imagesOutline } from 'ionicons/icons';
import { IAlbum } from '../../api/models/album.model';

type Props = { album: IAlbum; itemClicked: () => void };

const AlbumListItem = (props: Props) => {
  const { album } = props;

  return (
    <IonItem button onClick={props.itemClicked}>
      <IonIcon icon={imagesOutline} slot="start" />
      <IonLabel>{album.title}</IonLabel>
    </IonItem>
  );
};

export default AlbumListItem;
