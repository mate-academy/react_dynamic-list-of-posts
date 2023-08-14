import React, { useContext } from 'react';
import { deleteComment } from '../api/comment';
import { Post } from '../types/Post';
import { PostContext } from './context/PostContext';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null,
  isCommentFormActive: boolean,
  setIsCommentFormActive: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPost,
  isCommentFormActive,
  setIsCommentFormActive,
}) => {
  const {
    error,
    comments,
    setComments,
    isLoading,
  } = useContext(PostContext);

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

        {isCommentFormActive && <NewCommentForm selectedPost={selectedPost} />}
      </div>
    </div>
  );
});
