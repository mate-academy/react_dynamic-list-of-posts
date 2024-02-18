import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { DispatchContext, StateContext } from '../management/StateContext';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    comments,
    currentPost,
    isLoaderComments,
    errorGetComments,
    showFormWriteComment,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleOpenForm = () => {
    dispatch({ type: 'showForm', payload: true });
  };

  const handleDeleteComment = (comment: Comment) => {
    dispatch({ type: 'commentForDelete', payload: comment });
  };

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
          {isLoaderComments
            ? <Loader />
            : (
              <>
                {errorGetComments && !isLoaderComments && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}

                {!comments.length && !errorGetComments && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!!comments.length && !errorGetComments && (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => (
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
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDeleteComment(comment)}
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

                {!errorGetComments
                  && !isLoaderComments
                  && !showFormWriteComment
                  && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={handleOpenForm}
                    >
                      Write a comment
                    </button>
                  )}
              </>
            )}
        </div>

        {showFormWriteComment && !errorGetComments && <NewCommentForm />}
      </div>
    </div>
  );
};
