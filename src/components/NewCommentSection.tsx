import React, { useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';

interface Props {
  onAddComment: (comment: CommentData) => Promise<void>;
}

export const NewCommentSection: React.FC<Props> = ({ onAddComment }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);

  const handleSubmit = async (data: CommentData) => {
    await onAddComment(data);
  };

  return (
    <div className="block">
      {!isFormOpen && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={openForm}
        >
          Write a comment
        </button>
      )}

      {isFormOpen && <NewCommentForm onSubmit={handleSubmit} />}
    </div>
  );
};
