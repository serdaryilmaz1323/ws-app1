import React from 'react';
import { IonItem, IonLabel, IonIcon } from '@ionic/react';
import { bookOutline } from 'ionicons/icons';
import { IPost } from '../../api/models/post.model';

type Props = { post: IPost; itemClicked: () => void };

const PostListItem = (props: Props) => {
  const { post } = props;

  return (
    <IonItem button onClick={props.itemClicked}>
      <IonIcon icon={bookOutline} slot="start" />
      <IonLabel>{post.title}</IonLabel>
    </IonItem>
  );
};

export default PostListItem;
