import React from 'react';
import { User } from './User';
import { Comment } from './Comment';
import './PostCard.css';

type Props = {
  post: Post;
};

export const PostCard: React.FC<Props> = ({ post }) => {
  const {
    title, body, postUser, postComment,
  } = post;

  return (
    <li className="post__item">
      <h2 className="post__title">
        {title}
      </h2>
      <ul className="post__user user">
        <User postUser={postUser} />
      </ul>
      <p className="post__text">
        {body}
      </p>
      <ul className="post__comment comment__list">
        {postComment.map(comment => (
          <li className="comment__item" key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </li>
  );
};
