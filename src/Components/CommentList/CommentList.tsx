import React from 'react';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../Helpers/api';
import './CommentList.css';

type Props = {
  comments?: Comment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <div className="comments__list">
      <h2 className="comments__p">Comments:</h2>
      <ul>
        {comments?.map((comment: Comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </ul>
    </div>
  );
};
