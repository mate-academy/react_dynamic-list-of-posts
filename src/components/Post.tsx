import React, { FC } from 'react';
import { Comments, User } from '../interfaces';
import { Person } from './Person';
import { CommentList } from './CommentList';

interface Props {
  title: string;
  body: string;
  comments: Comments[];
  user: User;
}


export const Post: FC<Props> = ({
  title, body, user, comments,
}) => (
  <>
    <h2 className="post__title">{title}</h2>
    <p className="post__body">{body}</p>
    <Person user={user} />
    <h3>Comments</h3>
    <CommentList commentsToPost={comments} />
  </>
);
