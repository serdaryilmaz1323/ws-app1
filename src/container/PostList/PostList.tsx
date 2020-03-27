import React, { useState, useEffect } from 'react';
import { IPost } from '../../api/models/post.model';
import { useHistory } from 'react-router';
import { PostService } from '../../api/services/post.service';
import GridLayout from '../../layout/GridLayout';
import { IonCol, IonList } from '@ionic/react';
import PostListItem from './PostListItem';
import Loading from '../../components/Loading';

type Props = { userId: number };
type State = {
  postList: IPost[];
  loading: boolean;
};

const PostList = (props: Props) => {
  const [state, setState] = useState<State>({ loading: true, postList: [] });

  const history = useHistory();

  useEffect(() => {
    let cancel = false;

    PostService.fetchPostList(props.userId).then(response => {
      if (cancel) return;

      setState({ ...state, postList: response, loading: false });
    });

    return () => {
      cancel = true;
    };
    //eslint-disable-next-line
  }, []);

  const handleItemClicked = (post: IPost) => {
    history.push(`/user/${props.userId}/posts/${post.id}`);
    //setState({ ...state, openModal: true, selectedAlbumId: id });
  };

  return state.loading ? (
    <Loading />
  ) : (
    <GridLayout>
      <IonCol sizeXs="12" sizeSm="12" sizeMd="11" sizeLg="10" sizeXl="8">
        <IonList>
          {state.postList.map(item => {
            return <PostListItem key={item.id} post={item} itemClicked={() => handleItemClicked(item)} />;
          })}
        </IonList>
      </IonCol>
    </GridLayout>
  );
};

export default PostList;
