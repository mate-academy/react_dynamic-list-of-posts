export type FormErrors = {
  name: boolean;
  email: boolean;
  body: boolean;
};

export type LoadingError = {
  users: boolean;
  posts: boolean;
  comments: boolean;
  newComment: boolean;
  delete: boolean;
};
