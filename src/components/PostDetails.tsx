/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { GlobalContext } from '../AppContext';

export const PostDetails: React.FC = () => {
  const {
    selectedUserPosts,
    postActiveId,
    commentsForPost,
    isLoading,
    error,
    selectedUser,
    handleDeleteComment,
  } = useContext(GlobalContext);

  const [isFormOpened, setIsFormOpened] = useState(false);

  useEffect(() => {
    setIsFormOpened(false);
  }, [postActiveId]);

  if (!selectedUser || !postActiveId || !selectedUserPosts) {
    return null;
  }

  const currentPost = selectedUserPosts.find(post => post.id === postActiveId) || null;

  function handleWriteComment() {
    setIsFormOpened(true);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}
          {!error && !isLoading && (commentsForPost.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <div>
              <p className="title is-4">Comments:</p>
              {commentsForPost.map((comment, i) => (
                <article key={comment.name + i.toString()} className="message is-small" data-cy="Comment">
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
            </div>
          ))}
        </div>
        {!isFormOpened && !isLoading && !error && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => handleWriteComment()}
          >
            Write a comment
          </button>
        )}
        {isFormOpened && <NewCommentForm /> }
      </div>
    </div>
  );
};
