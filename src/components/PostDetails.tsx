import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
  comments: Comment[] | null;
  hasCommentsError: boolean;
  removeComment: (commentId: number) => void;
  addComment: (comment: CommentData) => void;
  isCommentAdditionError: boolean;
  isCommentAdditionLoading: boolean;
};

export const PostDetails: React.FC<Props> = React.memo(({
  post,
  comments,
  hasCommentsError,
  removeComment,
  addComment,
  isCommentAdditionError,
  isCommentAdditionLoading,
}) => {
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    return () => {
      setIsFormActive(false);
    };
  }, [post]);

  const shouldShowNoCommentsMessage = !hasCommentsError
    && comments && !comments.length;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {(comments === null && !hasCommentsError) && (
            <Loader />
          )}

          {hasCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {shouldShowNoCommentsMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments && comments.length > 0) && (
            <>
              <p className="title is-4">Comments:</p>

              <article className="message is-small" data-cy="Comment">
                {comments.map(comment => (
                  <React.Fragment key={comment.id}>
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
                        onClick={() => removeComment(comment.id)}
                      >
                        Delete comment
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </React.Fragment>
                ))}
              </article>
            </>
          )}

          {!isFormActive && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormActive(!isFormActive)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormActive && (
          <NewCommentForm
            postId={post.id}
            addComment={addComment}
            isCommentAdditionError={isCommentAdditionError}
            isCommentAdditionLoading={isCommentAdditionLoading}
          />
        )}
      </div>
    </div>
  );
});
