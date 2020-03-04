import React, { FC } from 'react';

import { User } from './User';
import { CommentsList } from './CommentsList';

import { FullPost } from '../constants/types';

interface Props {
  post: FullPost;
}


export const PostItem: FC<Props> = (props) => {
  const {
    post: {
      title,
      body,
      user: {
        name,
        email,
        address,
      },
      comments,
    },
  } = props;

  return (
    <>
      <p>
        <b>Title:</b>
        {' '}
        {title}
      </p>
      <p>
        <b>Body:</b>
        {' '}
        {body}
      </p>
      <User
        name={name}
        email={email}
        address={address}
      />
      <CommentsList comments={comments} />
    </>
  );
};
