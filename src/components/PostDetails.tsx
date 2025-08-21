import React from 'react';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';

type Props = {
  name: string;
  email: string;
  text: string;
  isSubmitted: boolean;
  selectedPost?: Post;
  comments: Comment[];
  errorMessage: string;
  isLoading: boolean;
  isPressed: boolean;
  selectedUserId: number;
  isCreatingComment: boolean;
  createCommentError: string;
  deleteCommentError: string;
  onDelete: (commentId: number) => void;
  onPressed: (isPressed: boolean) => void;
  onHandleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHandleReset: () => void;
  onHandleForm: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const PostDetails: React.FC<Props> = ({
  name,
  email,
  text,
  isSubmitted,
  selectedPost,
  comments,
  errorMessage,
  isLoading,
  isPressed,
  selectedUserId,
  isCreatingComment,
  createCommentError,
  deleteCommentError,
  onDelete,
  onPressed,
  onHandleName,
  onHandleEmail,
  onHandleText,
  onHandleReset,
  onHandleForm,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage !== '' && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {createCommentError !== '' && (
            <div
              className="notification is-danger"
              data-cy="CreateCommentError"
            >
              {createCommentError}
            </div>
          )}

          {deleteCommentError !== '' && (
            <div
              className="notification is-danger"
              data-cy="DeleteCommentError"
            >
              {deleteCommentError}
            </div>
          )}

          {selectedPost?.id !== -1 && !isLoading && errorMessage === '' && (
            <>
              {comments.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments.map(comment => (
                    <article
                      className="message is-small"
                      key={comment.id}
                      data-cy="Comment"
                    >
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
                          onClick={() => onDelete(comment.id)}
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
            </>
          )}

          {!isLoading && !isPressed && errorMessage === '' && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => onPressed(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isPressed && (
          <NewCommentForm
            isLoading={isCreatingComment}
            selectedUserId={selectedUserId}
            name={name}
            email={email}
            text={text}
            isSubmitted={isSubmitted}
            onHandleName={onHandleName}
            onHandleEmail={onHandleEmail}
            onHandleText={onHandleText}
            onHandleReset={onHandleReset}
            onHandleForm={onHandleForm}
          />
        )}
      </div>
    </div>
  );
};
