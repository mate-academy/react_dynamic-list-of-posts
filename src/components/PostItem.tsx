import React, { FC } from 'react';

interface Props {
  post: CorrectPost;
}

export const PostItem: FC<Props> = ({ post }) => {
  const {
    id,
    user,
    body,
    title,
    postComments,
  } = post;

  return (
    <li>
      <div className="card border-secondary mb-3 row">
        <div className="card-header">
          <span>{`#${id}`}</span>
          <h6 className="card-title">{user.name}</h6>
        </div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{body}</p>
          <ul className="comments">
            {postComments.map(comment => (
              <li key={`comment${comment.id}`}>
                <div className="card-header">
                  <span className="text-primary">{comment.name}</span>
                  <br />
                  <span className="text-secondary">{comment.email}</span>
                </div>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};
