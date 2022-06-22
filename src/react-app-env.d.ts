/// <reference types="react-scripts" />

export type Post = {
  'id': number,
  'userId': number,
  'title': string,
  'body': string,
  'createdAt': string,
  'updatedAt': string
};

export type Comment = {
  'id': number,
  'body': string,
  'createdAt': string,
  'updatedAt': string,
  'postId': number,
  'name': string,
  'email': string,
};

export type NewComment = {
  'id': number,
  'postId': number,
  'name': string,
  'email': string,
  'body': string,
  'createdAt': string,
  'updatedAt': string,
};
