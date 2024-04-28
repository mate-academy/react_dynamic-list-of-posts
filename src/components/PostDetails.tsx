import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostContext } from '../contexts/postContext';

export const PostDetails: React.FC = () => {
  const {
    currentPost,
    postComments,
    isErrorCommentsShown,
    isCommentsLoaderShown,
    isFormOpened,
    setIsFormOpened,
    handleDeleteCommentButton,
  } = useContext(PostContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${currentPost?.id}: ${currentPost?.title}`}</h2>

          <p data-cy="PostBody">{currentPost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoaderShown && <Loader />}

          {isErrorCommentsShown && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isErrorCommentsShown && !isCommentsLoaderShown && (
            <>
              {postComments.length === 0 && !isErrorCommentsShown && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!!postComments.length && <p className="title is-4">Comments:</p>}

              {postComments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      onClick={() => handleDeleteCommentButton(comment.id)}
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {!isFormOpened && (
                <button
                  onClick={() => setIsFormOpened(true)}
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormOpened && <NewCommentForm />}
      </div>
    </div>
  );
};
