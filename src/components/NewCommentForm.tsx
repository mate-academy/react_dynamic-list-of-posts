import cn from 'classnames';
import React, { useState } from 'react';
import { Error } from '../types/Error';
import { Comment } from '../types/Comment';
import { postComment } from '../api/comment';
import { Post } from '../types/Post';
import { initialCommentState } from '../utils/initialCommentState';
import { initialErrorState } from '../utils/initialErrorState';
import { isValidEmail } from '../utils/validEmail';

type Props = {
  selectedPost: Post | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setError: React.Dispatch<React.SetStateAction<Error>>,
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  selectedPost,
  setComments,
  setError,
}) => {
  const [comment, setComment] = useState(initialCommentState);
  const [isCommentAdding, setIsCommentAdding] = useState(false);
  const [commentError, setCommentError] = useState(initialErrorState);

  const handleInputChange = (key: string, value: string) => {
    setComment(prevComment => ({
      ...prevComment,
      [key]: value,
    }));

    if (key === 'authorEmail') {
      setCommentError((prevError) => ({
        ...prevError,
        authorEmailError: !isValidEmail(value),
      }));
    } else {
      setCommentError((prevError) => ({
        ...prevError,
        [`${key}Error`]: value === '',
      }));
    }
  };

  const emailValidationError = commentError.authorEmailError || (
    comment.authorEmail && !isValidEmail(comment.authorEmail)
  );

  const handleSubmitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!comment) {
      setCommentError({
        ...commentError,
        authorNameError: true,
        authorEmailError: true,
        authorCommentError: true,
      });
    }

    if (!comment.authorName || !comment.authorEmail || !comment.authorComment) {
      setCommentError({
        ...commentError,
        authorNameError: !comment.authorName,
        authorEmailError: !comment.authorEmail,
        authorCommentError: !comment.authorComment,
      });

      return;
    }

    let newComment: Omit<Comment, 'id'>;

    try {
      if (selectedPost) {
        newComment = {
          postId: selectedPost.id,
          name: comment.authorName,
          email: comment.authorEmail,
          body: comment.authorComment,
        };

        setIsCommentAdding(true);
        await postComment(newComment);
        setComments(currentComments => [...currentComments,
          { ...newComment, id: +new Date() }]);

        setComment({
          ...comment,
          authorComment: '',
        });
        setIsCommentAdding(false);
      }
    } catch {
      setError(Error.Load);
    }
  };

  const resetForm = () => {
    setComment(initialCommentState);
    setCommentError(initialErrorState);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': commentError.authorNameError,
            })}
            value={comment.authorName}
            onChange={(e) => handleInputChange('authorName', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {commentError.authorNameError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {commentError.authorNameError
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
              Name is required
            </p>
          )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            value={comment.authorEmail}
            className={cn('input', {
              'is-danger': emailValidationError,
            })}
            onChange={(e) => handleInputChange('authorEmail', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailValidationError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {emailValidationError
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
              {comment.authorEmail && !isValidEmail(comment.authorEmail)
                ? 'Please enter valid email'
                : 'Email is required'}
            </p>
          )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': commentError.authorCommentError,
            })}
            value={comment.authorComment}
            onChange={(e) => handleInputChange('authorComment', e.target.value)}
          />
        </div>

        {commentError.authorCommentError
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
              Enter some text
            </p>
          )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isCommentAdding,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => resetForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
