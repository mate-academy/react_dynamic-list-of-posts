import React from 'react';
import CommentsList from './CommentsList';

type Props = {
  post: Post;
};

const Post: React.FC<Props> = ({ post }) => {
  const {
    id,
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <li className="posts__item">
      <article>
        <header className="posts__item-title">
          {title}
        </header>
        <span className="posts__item-info">
          id:
          {' '}
          {id}
        </span>
        <span className="posts__item-info">
          author:
          {' '}
          {user ? user.name : 'unknown'}
        </span>
        <p className="posts__item-text">
          {body}
        </p>
        {comments && (
          <CommentsList comments={comments} />
        )}
      </article>
    </li>
  );
};

export default Post;
