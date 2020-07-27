import React from 'react';
import './Post.css';
import { User } from './User/User';
import { CommentList } from './CommentList/CommentList';
import { Comment, User as UserInterface } from '../interfaces';


interface Post {
  body: string;
  comments: Comment[];
  title: string;
  user: UserInterface;
}

export const Post = ({ title, body, user, comments }: Post) => {
  const postTitle = (title)[0].toUpperCase() + (title).slice(1);
  const postMessage = (body)[0].toUpperCase() + (body).slice(1);

  return (
    <>
      <h3 className="post__title">{postTitle}</h3>
      <p>{postMessage}</p>
      <User {...user} />
      <CommentList props={comments} />
    </>
  );
};
