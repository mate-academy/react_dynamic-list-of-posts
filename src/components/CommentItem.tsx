import React, { FC } from 'react';

import { Comment } from '../constants/types';

interface Props {
  comment: Comment;
}


export const CommentItem: FC<Props> = (props) => {
  const { comment } = props;

  return (
    <>
      {comment.body}
    </>
  );
};
