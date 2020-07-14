import React, { FC } from 'react';
import { User } from '../../interfaces/User';
import { Comment } from '../../interfaces/Comment';
import { CommentItem } from '../CommentItem';

interface Props {
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

export const PostItem: FC<Props> = ({
  title,
  body,
  user,
  comments,
}) => (
  <li className="post">
    <div className="post__author">
      <p className="red-text">
        <strong>
          {user.name}
        </strong>
      </p>
      <a href={`mailto:${user.email}`} className="post__email">
        {user.email.toLowerCase()}
      </a>
    </div>
    <div className="post__content">
      <h3>{title}</h3>
      <p className="flow-text">{body}</p>
      <ul>
        {
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              body={comment.body}
              name={comment.name}
              email={comment.email}
            />
          ))
        }
      </ul>
    </div>
  </li>
);
