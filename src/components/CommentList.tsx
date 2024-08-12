import React from 'react';
import { Comment } from './Comment';

type Props = {
  comments: Array<{
    id: number;
    name: string;
    email: string;
    body: string;
  }>;
  handleDelete: (id: number) => void;
};

export const CommentList: React.FC<Props> = ({ comments, handleDelete }) => {
  return (
    <>
      {comments.map(({ id, email, name, body }) => (
        <Comment
          key={id}
          id={id}
          name={name}
          email={email}
          body={body}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};
