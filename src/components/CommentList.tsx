import React, { FC } from 'react';
import { Comments } from '../interfaces';
import { Comment } from './Comment';

interface Props {
  commentsToPost: Comments[];
}

export const CommentList: FC<Props> = ({ commentsToPost }) => (
  <>
    {commentsToPost.map(comment => {
      const {
        id,
        name,
        body,
        email,
      } = comment;

      return (
        <Comment
          key={id}
          name={name}
          body={body}
          email={email}
        />
      );
    })}
  </>
);
