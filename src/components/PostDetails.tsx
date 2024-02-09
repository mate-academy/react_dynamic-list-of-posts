import React from 'react';
import { effect } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import {
  comments, isCommentsErrorVisible,
  isCommentsFormVisible, isCommentsLoaderVisible,
  isCommentsNotificationVisible, isWriteCommentButtonVisible, selectedPost,
} from '../signals/signals';
import { getComments } from '../api';
import { deleteComment } from '../api/comments';

effect(() => {
  if (selectedPost.value) {
    isCommentsErrorVisible.value = false;
    isCommentsFormVisible.value = false;
    comments.value = [];
    isCommentsLoaderVisible.value = true;
    getComments(selectedPost.value.id)
      .then(response => {
        comments.value = response;
      })
      .catch(() => {
        isCommentsErrorVisible.value = true;
      })
      .finally(() => {
        isCommentsLoaderVisible.value = false;
      });
  }
});

export const PostDetails: React.FC = () => {
  useSignals();

  const handleWriteCommentButtonClick = () => {
    isCommentsFormVisible.value = true;
  };

  const handleDeleteComment = (commentId: number) => {
    comments.value = comments.value.filter(comment => comment.id !== commentId);
    deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.value?.id}: ${selectedPost.value?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.value?.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoaderVisible.value && <Loader />}

          {isCommentsErrorVisible.value && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isCommentsNotificationVisible.value && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!!comments.value.length && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.value.map(comment => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {isWriteCommentButtonVisible.value && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentButtonClick}
            >
              Write a comment
            </button>
          )}

        </div>

        {isCommentsFormVisible.value && <NewCommentForm />}

      </div>
    </div>
  );
};
