import React from 'react';
import {
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonRow,
  IonNote,
} from '@ionic/react';
import { checkmarkDoneOutline, sendOutline, albumsOutline } from 'ionicons/icons';
import { locationOutline, businessOutline } from 'ionicons/icons';
import { IUser } from '../../../api/models/user.model';
import { useHistory } from 'react-router';

type Props = {
  user: IUser;
};

const UserListItem = (props: Props) => {
  const history = useHistory();

  const gotoTodos = () => {
    const url = `/user/${props.user.id}/todos`;
    history.push(url);
  };

  const gotoAlbums = () => {
    const url = `/user/${props.user.id}/albums`;
    history.push(url);
  };

  const gotoPosts = () => {
    const url = `/user/${props.user.id}/posts`;
    history.push(url);
  };

  return (
    <IonCol sizeXs="12" sizeSm="9" sizeMd="6" sizeLg="4" sizeXl="4">
      <IonCard className="user-list-item">
        <IonCardHeader>
          <IonCardTitle color="danger">
            {props.user.name} <IonNote color="secondary">{props.user.username}</IonNote>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Phone: {props.user.phone} </p>
          <p>Web-site: {props.user.website} </p>
          <p>E-mail: {props.user.email} </p>
        </IonCardContent>
        <IonItem>
          <IonIcon icon={locationOutline} slot="start" />
          <IonLabel>
            {props.user.address.city} {props.user.address.zipcode}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon icon={businessOutline} slot="start" />
          <IonLabel>{props.user.company.name}</IonLabel>
        </IonItem>
        <IonRow>
          <IonCol className="nav-col" onClick={gotoTodos}>
            <IonIcon className="nav-icon" icon={checkmarkDoneOutline} />
            Todos
          </IonCol>
          <IonCol className="nav-col" onClick={gotoPosts}>
            <IonIcon className="nav-icon" icon={sendOutline} />
            Posts
          </IonCol>
          <IonCol className="nav-col" onClick={gotoAlbums}>
            <IonIcon className="nav-icon" icon={albumsOutline} />
            Albums
          </IonCol>
        </IonRow>
      </IonCard>
    </IonCol>
  );
};

export default UserListItem;
