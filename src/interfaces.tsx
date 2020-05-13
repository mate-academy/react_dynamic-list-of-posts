
export interface AppState {
  loadButtonText: string;
  isLoadButtonVisible: boolean;
  comments: Comment[];
  posts: PostType[];
  users: UserType[];
  isCommentsLoaded: boolean;
  isPostsLoaded: boolean;
  isUsersLoaded: boolean;
}

export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostPropsType {
  user: UserType[];
  post: PostType;
  commentsList: Comment[];
}

export interface CommentsListPropsType {
  commentsList: Comment[];
}

export interface ListOfPostsPropsType {
  users: UserType[];
  posts: PostType[];
  comments: Comment[];
}
