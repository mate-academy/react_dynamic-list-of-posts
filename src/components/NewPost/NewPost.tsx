import React, { FC } from 'react';
import { CompletePost, Comment } from '../../types';
import { NewComment } from '../NewComment/NewComment';
import './NewPost.css';

interface Props {
  post: CompletePost;
}

export const NewPost: FC<Props> = ({ post }) => {
  const { title, body, comments } = post;
  const { name, email } = post.user;
  const {
    city,
    street,
    suite,
    zipcode,
  } = post.user.address;

  return (
    <div className="post__wrapper">
      <div>
        <h3>{name}</h3>
        <div className="user__email">
          <a href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        <div className="address">
          <p>{city}</p>
          <p>{street}</p>
          <p>{suite}</p>
          <p>{zipcode}</p>
        </div>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="comment__wrapper">
        {comments.map((comment: Comment) => (
          <NewComment
            comment={comment}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
};
