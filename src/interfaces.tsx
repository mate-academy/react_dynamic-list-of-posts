
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

export interface CustomisedPostType {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: UserType;
  commentsList: Comment[];
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
  post: CustomisedPostType;
}

export interface CommentsListPropsType {
  commentsList: Comment[];
}

export interface ListOfPostsPropsType {
  posts: CustomisedPostType[];

}

export interface UserPropsType {
  user: UserType;
}
