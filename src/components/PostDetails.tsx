/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useCommentsContext } from '../hooks/useCommentsContext';
import { usePostsContext } from '../hooks/usePostsContext';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const { selectedPost } = usePostsContext();
  const {
    comments,
    isCommentsError,
    isCommentsPending,
    handleDeleteComment,
  } = useCommentsContext();

  const [addPost, setAddPost] = useState(false);

  const hasError = isCommentsError && !isCommentsPending;
  const withoutError = selectedPost && !isCommentsError;
  const pending = withoutError && isCommentsPending;
  const fetched = withoutError && !isCommentsPending;

  useEffect(() => {
    setAddPost(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost?.id}: {selectedPost?.title}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {pending && <Loader />}
        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {fetched && (
          <>
            {comments.length > 0
              ? (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments.map(comment => (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${comment.email}`}
                          data-cy="CommentAuthor"
                        >
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
              )
              : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
            {!addPost && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setAddPost(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {addPost && <NewCommentForm />}
    </div>
  );
};
