import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCol,
  IonCardHeader,
  IonCardContent,
  IonCard,
  IonCardTitle,
  IonText,
} from '@ionic/react';
import { useRouteMatch } from 'react-router';
import { IPost, IPostComment } from '../api/models/post.model';
import { PostService } from '../api/services/post.service';
import CommentListItem from '../container/PostList/CommentListItem';
import GridLayout from '../layout/GridLayout';
import Loading from '../components/Loading';

type Props = {};
type State = { post: IPost | null; comments: IPostComment[] | null; loading: boolean };

const PostDetailPage = (props: Props) => {
  const [state, setState] = useState<State>({ post: null, comments: [], loading: true });

  const routeMatch = useRouteMatch<{ id?: string; postId?: string }>();
  // const userId = Number(routeMatch.params.id);
  const postId = Number(routeMatch.params.postId);

  useEffect(() => {
    let cancel = false;

    PostService.getPostWithComments(postId).then(response => {
      if (cancel) return;

      if (response.post === null) {
        console.log('Post bulunamadi');
      }

      setState({ ...state, post: response.post, comments: response.comments, loading: false });
    });

    return () => {
      cancel = true;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{state.post?.title || 'Post Content'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {state.loading ? (
          <Loading />
        ) : (
          <GridLayout>
            <IonCol size="9">
              <IonCard>
                <h1>
                  <IonText className="ion-padding" color="danger">
                    Post Content
                  </IonText>
                </h1>
                <IonCardHeader>
                  <IonCardTitle>{state.post?.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{state.post?.body}</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <h2>
                <IonText color="danger">Comments</IonText>
              </h2>
            </IonCol>
            <IonCol size="7">
              {state.comments?.map(item => {
                return <CommentListItem key={item.id} comment={item} />;
              })}
            </IonCol>
          </GridLayout>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PostDetailPage;
