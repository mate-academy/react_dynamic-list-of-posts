import React, { FC } from 'react';

interface Props {
  post: PostWithUserAndComment;
}

export const Post: FC<Props> = (props) => {
  const { post } = props;
  const { title, body } = post;

  return (
    <div className="posts">
      <h2 className="subtitle is-4">{title}</h2>
      <p className="subtitle is-5">{body}</p>
    </div>
  );
};
