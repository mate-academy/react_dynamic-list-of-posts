import React from 'react';
import { Loader } from './Loader';
import { useComment } from '../hooks/useComment';
import CommentList from './CommentList';
import { NewCommentForm } from './NewCommentForm';

const PostDetailsComments:React.FC = () => {
  const {
    comments,
    commentsLoadingError,
    commentsLoading,
    isFormOpen,
    handleFormOpening,
  } = useComment();

  if (commentsLoading) {
    return <Loader />;
  }

  if (commentsLoadingError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <>
      <CommentList comments={comments} />

      {
        isFormOpen
          ? (<NewCommentForm />)
          : (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleFormOpening}
            >
              Write a comment
            </button>
          )
      }
    </>
  );
};

export default PostDetailsComments;
