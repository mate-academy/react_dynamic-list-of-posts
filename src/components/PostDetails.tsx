import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Errors } from '../utils/errors';

type Props = {
  comments: Comment[];
  errorMessage: string | null;
  isCommentsLoading: boolean;
  selectedPost: Post | null;
  onNewComment: (comments: Comment[]) => void;
  onError: (message: string) => void;
  onDelete: (id: number, lastComments: Comment[]) => void;
  onFormOpen: (isOpen: boolean) => void;
  isFormOpen: boolean;
};

export const PostDetails: React.FC<Props> = React.memo(
  ({
    comments,
    errorMessage,
    isCommentsLoading,
    selectedPost,
    onNewComment,
    onError,
    onDelete,
    onFormOpen,
    isFormOpen,
  }) => {
    const shouldShowComments =
      comments.length > 0 &&
      (!errorMessage || errorMessage === Errors.Deleting);

    return (
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{`${selectedPost?.body}`}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {comments.length === 0 && !isCommentsLoading && !errorMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {shouldShowComments && (
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
                      onClick={() => onDelete(comment.id, comments)}
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

          {isFormOpen === false && !isCommentsLoading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => onFormOpen(!isFormOpen)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && (
          <NewCommentForm
            selectedPost={selectedPost}
            comments={comments}
            onNewComment={onNewComment}
            onError={onError}
          />
        )}
      </div>
    );
  },
);

PostDetails.displayName = 'PostDetails';
