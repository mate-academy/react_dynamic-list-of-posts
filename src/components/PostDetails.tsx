import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Fields } from '../types/Fields';

type Props = {
  comments: Comment[];
  post: Post;
  error: string;
  isLoading: boolean;
  onAddComment: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmit: boolean;
  onCommentDelete: (id: number) => void;
  name: string;
  email: string;
  body: string;
  handleChangeField: (value: string, field: keyof typeof Fields) => void;
  errorName: boolean;
  errorEmail: boolean;
  errorBody: boolean;
  isFormDisplayed: boolean;
  setIsFormDisplayed: (arg: boolean) => void;
  reset: () => void;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  post,
  error,
  isLoading,
  onAddComment,
  isSubmit,
  onCommentDelete,
  name,
  email,
  body,
  handleChangeField,
  errorName,
  errorEmail,
  errorBody,
  isFormDisplayed,
  setIsFormDisplayed,
  reset,
}) => {
  const commentsContent = !comments.length
    ? (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    )
    : (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => {
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
                  {comment.name}
                </a>

                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => onCommentDelete(comment.id)}
                >
                  delete button
                </button>
              </div>
              <div
                className="message-body"
                data-cy="CommentBody"
              >
                {comment.body}
              </div>
            </article>
          );
        })}
      </>
    );

  const newCommentButton = !isFormDisplayed && (
    <button
      data-cy="WriteCommentButton"
      type="button"
      className="button is-link"
      onClick={() => setIsFormDisplayed(true)}
    >
      Write a comment
    </button>
  );

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
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!isLoading && (
            <>
              {commentsContent}
              {newCommentButton}
            </>
          )}

        </div>

        {isFormDisplayed && (
          <NewCommentForm
            onAddComment={onAddComment}
            isSubmit={isSubmit}
            name={name}
            email={email}
            body={body}
            handleChangeField={handleChangeField}
            errorName={errorName}
            errorEmail={errorEmail}
            errorBody={errorBody}
            reset={reset}
          />
        )}
      </div>
    </div>
  );
};
