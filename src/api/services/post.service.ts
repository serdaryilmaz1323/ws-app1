import { IPost, IPostComment } from './../models/post.model';
import axios from 'axios';

export const PostService = {
  fetchPostList: async (userId: number): Promise<IPost[]> => {
    return await axios
      .get<IPost[]>('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
      .then(response => {
        return response.data; //.filter(item => item.userId === userId);
      })
      .catch(error => {
        return [];
      });
  },
  fetchCommentList: async (postId: number): Promise<IPostComment[]> => {
    return await axios
      .get<IPostComment[]>('https://jsonplaceholder.typicode.com/comments?postId=' + postId)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return [];
      });
  },
  getPostWithComments: async (postId: number): Promise<{ post: IPost | null; comments: IPostComment[] | null }> => {
    const commentPromise = axios
      .get<IPostComment[]>('https://jsonplaceholder.typicode.com/comments?postId=' + postId)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return [] as IPostComment[];
      });

    const postPromise = axios
      .get<IPost>('https://jsonplaceholder.typicode.com/posts/' + postId)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return null;
      });

    console.log('[getPostWithComments] Post id : ', postId);

    return Promise.all([postPromise, commentPromise]).then(result => {
      return { post: result[0], comments: result[1] };
    });
  },
};
