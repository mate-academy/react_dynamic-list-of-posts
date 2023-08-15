import React, { useEffect } from 'react';
import { deleteComment, getComments } from '../api/comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
// import { getComments } from '../api/comment';
import { Error } from '../types/Error';

type Props = {
  selectedPost: Post | null,
  isCommentFormActive: boolean,
  setIsCommentFormActive: React.Dispatch<React.SetStateAction<boolean>>,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  isLoading: boolean,
  error: Error,
  setError: React.Dispatch<React.SetStateAction<Error>>,
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPost,
  isCommentFormActive,
  setIsCommentFormActive,
  comments,
  setComments,
  isLoading,
  error,
  setError,
}) => {
  useEffect(() => {
    setError(Error.None);
    if (selectedPost) {
      getComments(selectedPost?.id)
        .then(setComments)
        .catch(() => setError(Error.Load));
    }
  }, [selectedPost?.id]);

  const removeComment = (id: number) => {
    setComments(currentComments => currentComments.filter(
      comment => comment.id !== id,
    ));

    deleteComment(id);
  };

  return (
    <div className="content" data-cy="PostDetails">
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
          {isLoading && <Loader />}

          {error
            && (
              <div
                className="notification is-danger"
                data-cy="CommentsError"
              >
                Something went wrong
              </div>
            )}

          {!error && comments.length === 0
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}
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
                  onClick={() => removeComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!error && !isCommentFormActive
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsCommentFormActive(true)}
              >
                Write a comment
              </button>
            )}
        </div>

        {isCommentFormActive
          && (
            <NewCommentForm
              setError={setError}
              selectedPost={selectedPost}
              setComments={setComments}
              isLoading={isLoading}
            />
          )}
      </div>
    </div>
  );
});
