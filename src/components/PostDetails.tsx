/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentsContext } from '../CommentsContext';
import { PostsContext } from '../PostsContext';
import { client } from '../utils/fetchClient';

export const PostDetails: React.FC = () => {
  const {
    commentsFromServer,
    isLoading,
    errorMessage,
    setCommentsFromServer,
    setErrorMessage,
  } = useContext(CommentsContext);
  const { currentPost } = useContext(PostsContext);

  const [writeComment, setWriteComment] = useState<boolean>(false);
  const handleDeleteComment = async (commentId: number) => {
    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      setErrorMessage('delete');
    } finally {
      let updatedComments = [...commentsFromServer];

      updatedComments = updatedComments
        .filter(comment => comment.id !== commentId);

      setCommentsFromServer(updatedComments);
    }
  };

  const printError = () => {
    switch (errorMessage) {
      case 'add':
        return 'Can not add comment';

      case 'delete':
        return 'Can not delete comment';

      default:
        return 'Something went wrong';
    }
  };

  useEffect(() => {
    if (writeComment || errorMessage) {
      setWriteComment(false);
    }
  }, [currentPost, errorMessage]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id} ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {printError()}
            </div>
          ) : commentsFromServer.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>

              <article className="message is-small" data-cy="Comment">
                {commentsFromServer.map(comment => (
                  <div key={comment.id}>
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
                  </div>
                ))}
              </article>
              {!writeComment && (
                <>
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setWriteComment(true)}
                  >
                    Write a comment
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
              {!writeComment && (
                <>
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setWriteComment(true)}
                  >
                    Write a comment
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {writeComment && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
