import React, { FC } from 'react';
import { Comments } from '../interfaces';
import { Comment } from './Comment';

interface Props {
  commentsToPost: Comments[];
}

export const CommentList: FC<Props> = ({ commentsToPost }) => (

  <>
    {commentsToPost.map(comment => (
      <Comment
        key={comment.id}
        name={comment.name}
        body={comment.body}
        email={comment.email}
      />
    ))}
  </>
);
