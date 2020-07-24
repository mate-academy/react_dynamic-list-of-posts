import React from 'react';
import { CommentsItem } from './CommentsItem';
import './CommentsList.css';

type Props = {
  comments: Comments[];
};

export const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <table className="table">
      <thead>
        <td>Name</td>
        <td>Email</td>
        <td>Comment</td>
      </thead>
      <tbody>
        { comments.map(comment => (
          <CommentsItem comment={comment} />))}
      </tbody>
    </table>
  );
};
