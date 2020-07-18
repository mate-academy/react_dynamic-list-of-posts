import React from 'react';
import { CompletePost } from '../../interfaces';

interface Props {
  post: CompletePost;
}

export const PostItem: React.FC<Props> = (props) => {
  const { post } = props;

  return (
    <>
      <h1 className="display-4">{post.title}</h1>
      <p className="lead">{post.body}</p>
      <span className="lead">{post.user.name}</span>
      {' / '}
      <span className="lead">{post.user.email}</span>
      {' / '}
      <span className="lead">{post.user.phone}</span>
      <hr className="my-4" />
      {post.comments.map(comment => (
        <ul key={comment.id}>
          <li>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
            <p>{comment.email}</p>
          </li>
        </ul>
      ))}
    </>
  );
};
