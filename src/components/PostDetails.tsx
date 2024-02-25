import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { StateContext } from '../State/StateProvider';

export const PostDetails: React.FC = () => {
  const {
    comments,
    isError,
    isPostLoader,
    selectedPost,
    setIsShowForm,
    isShowForm,
    handleDeleteComment,
  } = useContext(StateContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isPostLoader && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isPostLoader && !isError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !isPostLoader && !isError && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <div key={comment.id}>
                  <article className="message is-small" data-cy="Comment">
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
                </div>
              ))}
            </>
          )}
        </div>

        {!isShowForm && !isPostLoader && !isError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsShowForm(true)}
          >
            Write a comment
          </button>
        )}

        {isShowForm && <NewCommentForm />}
      </div>
    </div>
  );
};
