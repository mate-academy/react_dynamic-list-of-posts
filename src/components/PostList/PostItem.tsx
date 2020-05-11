import React from 'react';
import { User, Comment } from '../Interface';
import { CommentList } from '../Comments';

interface Props {
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

export const PostItem: React.FC<Props> = ({
  id,
  title,
  body,
  user,
  comments,
}) => (
  <article className="message is-primary" id={`${id}`}>
    <div className="message-header">
      <h1 className="title has-text-white is-capitalized is-4">
        {title}
      </h1>
    </div>
    <div className="message-body">
      <h2 className="subtitle">
        {`Author: ${user.username}`}
      </h2>
      {body}
      <CommentList comments={comments} />
    </div>
  </article>
);
