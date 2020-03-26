import React from 'react';
import {
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { locationOutline, businessOutline, key } from 'ionicons/icons';
import { IUser } from '../../../api/models/user.model';

type Props = {
  user: IUser;
  clickHandler: () => void;
};

const UserListItem = (props: Props) => {
  return (
    <IonCol size="6">
      <IonCard className="user-list-item" onClick={props.clickHandler}>
        <IonCardHeader>
          <IonCardSubtitle color="secondry">
            {props.user.username} {props.user.email}
          </IonCardSubtitle>
          <IonCardTitle color="danger">{props.user.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <p>Phone: {props.user.phone} </p>
          <p>Website: {props.user.website} </p>
        </IonCardContent>
        <IonItem className="ion-activated">
          <IonIcon icon={locationOutline} slot="start" />
          <IonLabel>
            {props.user.address.city} {props.user.address.zipcode}
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon icon={businessOutline} slot="start" />
          <IonLabel>{props.user.company.name}</IonLabel>
        </IonItem>
      </IonCard>
    </IonCol>
  );
};

export default UserListItem;
