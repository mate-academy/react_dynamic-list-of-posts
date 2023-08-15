import cn from 'classnames';
import React, { useState } from 'react';
import { Error } from '../types/Error';
import { Comment } from '../types/Comment';
import { postComment } from '../api/comment';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  isLoading: boolean,
  setError: React.Dispatch<React.SetStateAction<Error>>,
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  selectedPost,
  setComments,
  isLoading,
  setError,
}) => {
  const initialCommentState = {
    authorName: '',
    authorEmail: '',
    authorComment: '',
  };

  const initialErrorState = {
    isNameError: false,
    isEmailError: false,
    isCommentError: false,
  };

  const [comment, setComment] = useState(initialCommentState);
  const [commentError, setCommentError] = useState(initialErrorState);

  const handleInputChange = (key: string, value: string) => {
    setComment(prevComment => ({
      ...prevComment,
      [key]: value,
    }));

    setCommentError(prevError => ({
      ...prevError,
      [`is${key}Error`]: value === '',
    }));
  };

  const handleSubmitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!comment) {
      setCommentError({
        ...commentError,
        isNameError: true,
        isEmailError: true,
        isCommentError: true,
      });
    }

    if (!comment.authorName || !comment.authorEmail || !comment.authorComment) {
      setCommentError(prevError => ({
        ...prevError,
        isNameError: !comment.authorName,
        isEmailError: !comment.authorEmail,
        isCommentError: !comment.authorComment,
      }));

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

        await postComment(newComment);
        setComments(currentComments => [...currentComments,
          { ...newComment, id: +new Date() }]);

        setComment({
          ...comment,
          authorComment: '',
        });
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
              'is-danger': commentError.isNameError,
            })}
            value={comment.authorName}
            onChange={(e) => handleInputChange('authorName', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {commentError.isNameError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {commentError.isNameError
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
            className={cn('input', {
              'is-danger': commentError.isEmailError,
            })}
            value={comment.authorEmail}
            onChange={(e) => handleInputChange('authorEmail', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {commentError.isEmailError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {commentError.isEmailError
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
              Email is required
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
              'is-danger': commentError.isCommentError,
            })}
            value={comment.authorComment}
            onChange={(e) => handleInputChange('authorComment', e.target.value)}
          />
        </div>

        {commentError.isCommentError
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
              'is-loading': isLoading,
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
