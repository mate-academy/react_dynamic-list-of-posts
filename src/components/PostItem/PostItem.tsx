import React from 'react';
import { UserInterface } from '../../interfaces/UserInterface';
import { CommentInterface } from '../../interfaces/CommentInterface';
import { Comment } from '../Comment';

interface PostItemProps {
  title: string;
  body: string;
  user: UserInterface;
  comments: CommentInterface[];
}

export const PostItem: React.FC<PostItemProps> = ({
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
            <Comment
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
