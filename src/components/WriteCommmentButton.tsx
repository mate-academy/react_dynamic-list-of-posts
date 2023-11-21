import React, { useContext } from 'react';
import { ListContext } from './ListContext';

export const WriteCommentButton: React.FC = () => {
  const {
    setIsCommentFormVisible,
    isCommentFormVisible,
  } = useContext(ListContext);

  return (
    !isCommentFormVisible ? (
      <button
        data-cy="WriteCommentButton"
        type="button"
        className="button is-link"
        onClick={() => setIsCommentFormVisible(true)}
      >
        Write a comment
      </button>
    ) : (
      null
    )
  );
};
