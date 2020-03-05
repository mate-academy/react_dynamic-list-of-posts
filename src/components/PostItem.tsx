import React, { FC } from 'react';

import { User } from './User';
import { CommentsList } from './CommentsList';

import { FullPost } from '../constants/types';

interface Props {
  post: FullPost;
}


export const PostItem: FC<Props> = (props) => {
  const { post } = props;
  const {
    title,
    body,
    user,
    comments,
  } = post;

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
      <User user={user} />
      <CommentsList comments={comments} />
    </>
  );
};
