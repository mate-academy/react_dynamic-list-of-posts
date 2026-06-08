import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { LoadingState } from '../types/Loading';
import { FormErrors } from '../types/Errors';

type Props = {
  post: Post | null;
  comments: Comment[] | null;
  loadingError: boolean;
  isLoading: LoadingState;
  newComment: Comment | null;
  onAddComment: (comment: Comment) => void;
  formErrors: FormErrors;
  onFormErrorsChange: (field: keyof FormErrors, value: boolean) => void;
  onNewCommentSubmit: (newComment: Comment) => void;
  onClearForm: () => void;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  loadingError,
  isLoading,
  newComment,
  onAddComment,
  formErrors,
  onFormErrorsChange,
  onNewCommentSubmit,
  onClearForm,
  onDeleteComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loadingError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comments?.length === 0 && !isLoading.comments ? (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        ) : (
          <React.Fragment>
            {isLoading.comments ? (
              <Loader />
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments?.map(comment => {
                  return (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${comment.email}`}
                          data-cy="CommentAuthor"
                        >
                          {comment?.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => onDeleteComment(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  );
                })}
              </>
            )}
          </React.Fragment>
        )}

        {!newComment && !isLoading.comments && comments && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() =>
              onAddComment({
                id: 0,
                postId: post?.id || 0,
                name: '',
                email: '',
                body: '',
              })
            }
          >
            Write a comment
          </button>
        )}
      </div>

      {newComment && (
        <NewCommentForm
          isLoading={isLoading}
          newComment={newComment}
          onAddComment={onAddComment}
          formErrors={formErrors}
          onErrorChange={onFormErrorsChange}
          onNewCommentSubmit={onNewCommentSubmit}
          onClearForm={onClearForm}
        />
      )}
    </div>
  );
};
