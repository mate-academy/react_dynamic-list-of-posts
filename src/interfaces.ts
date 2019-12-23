export interface UserInterface {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

export interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface NormalizedPostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: CommentInterface[];
  user: UserInterface;
}
