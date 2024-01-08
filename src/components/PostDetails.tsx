import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePostContext } from '../context/PostProvider';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    selectedComments,
    commentsLoading,
    error,
    isEdit,
    setIsEdit,
    handleDeleteComment,
  } = usePostContext();

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
        {commentsLoading ? (
          <Loader />
        ) : (
          <>
            {error && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!selectedComments.length && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {!!selectedComments.length
            && <p className="title is-4">Comments:</p>}

            {selectedComments.map(comment => (
              <article
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

            {!isEdit && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsEdit(true)}
              >
                Write a comment
              </button>
            )}

            {isEdit && <NewCommentForm />}

          </>

        )}

      </div>
    </div>
  );
};
