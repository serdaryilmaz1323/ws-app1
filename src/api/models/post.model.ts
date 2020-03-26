export interface IPost {
  userId: number;
  id: number;
  title: string;
}

export interface IPostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
