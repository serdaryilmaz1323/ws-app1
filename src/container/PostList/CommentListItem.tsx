import React from 'react';
import { IPostComment } from '../../api/models/post.model';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonText } from '@ionic/react';

type Props = { comment: IPostComment };

const CommentListItem = (props: Props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.comment.name}</IonCardTitle>
        <IonCardSubtitle>
          <IonText color="tertiary">{props.comment.email}</IonText>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{props.comment.body}</IonCardContent>
    </IonCard>
  );
};

export default CommentListItem;
