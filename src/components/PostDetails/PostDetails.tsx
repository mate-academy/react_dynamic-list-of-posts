import React, { useContext } from 'react';

import { DispatchContext, StateContext } from '../../Store';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

import { CommentItem } from '../CommentItem/CommentItem';

export const PostDetails: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    selectedPost,
    comments,
    isLoadingComments,
    isOpenForm,
    error,
  } = useContext(StateContext);

  const hasNoComments = !comments.length && !isLoadingComments && !error;
  const hasComments = !!comments.length && !isLoadingComments && !error;
  const isVisibleButton = !isOpenForm && !isLoadingComments && !error;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {hasNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {isLoadingComments && (
          <Loader />
        )}

        {hasComments && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </>
        )}

        {isVisibleButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch({ type: 'setIsOpenForm', payload: true })}
          >
            Write a comment
          </button>
        )}
      </div>

      {isOpenForm && (
        <NewCommentForm />
      )}
    </div>
  );
};
