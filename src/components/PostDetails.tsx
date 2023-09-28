import React from 'react';
import { usePosts } from '../PostsContext';
import { CommentItem } from './CommentItem/CommentItem';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    isLoading,
    hasError,
    comments,
    openForm,
    setOpenForm,
  } = usePosts();

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (<Loader />)}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && !hasError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length && !isLoading && !hasError && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </>
          )}
        </div>
      </div>

      {openForm ? (
        <NewCommentForm />
      ) : (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setOpenForm(true)}
        >
          Write a comment
        </button>
      )}
    </div>
  );
};
