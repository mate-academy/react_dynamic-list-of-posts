import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  postId: number;
  addComment: (comment: CommentData) => void;
  isCommentAdditionError: boolean;
  isCommentAdditionLoading: boolean;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  postId,
  addComment,
  isCommentAdditionError,
  isCommentAdditionLoading,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputComment, setInputComment] = useState('');
  const [isInputNameRequired, setIsInputNameRequired] = useState(false);
  const [isInputEmailRequired, setIsInputEmailRequired] = useState(false);
  const [isInputCommentRequired, setIsInputCommentRequired] = useState(false);

  const validateForm = () => {
    const normalizedInputName = inputName.trim();
    const normalizedInputEmail = inputEmail.trim();
    const normalizedInputComment = inputComment.trim();

    const emailRegex = /^\S+@\S+\.\S+$/;
    const isEmailValid = emailRegex.test(normalizedInputEmail);

    setIsInputNameRequired(!normalizedInputName);
    setIsInputEmailRequired(!normalizedInputEmail || !isEmailValid);
    setIsInputCommentRequired(!normalizedInputComment);

    return (
      normalizedInputName
      && normalizedInputEmail
      && normalizedInputComment
      && isEmailValid
    );
  };

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      const comment: CommentData = {
        postId,
        name: inputName.trim(),
        email: inputEmail.trim(),
        body: inputComment.trim(),
      };

      addComment(comment);
      setInputComment('');
    }
  }, [inputName, inputEmail, inputComment]);

  const handleResetClick = useCallback(() => {
    setInputName('');
    setIsInputNameRequired(false);
    setInputEmail('');
    setIsInputEmailRequired(false);
    setInputComment('');
    setIsInputCommentRequired(false);
  }, []);

  const handleUserInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isInputNameRequired) {
        setIsInputNameRequired(false);
      }

      setInputName(event.target.value);
    }, [inputName, isInputNameRequired],
  );

  const handleUserEmailInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isInputEmailRequired) {
        setIsInputEmailRequired(false);
      }

      setInputEmail(event.target.value);
    }, [inputEmail, isInputEmailRequired],
  );

  const handleUserCommentInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isInputCommentRequired) {
        setIsInputCommentRequired(false);
      }

      setInputComment(event.target.value);
    }, [inputComment, isInputCommentRequired],
  );

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            className={classNames('input', {
              'is-danger': isInputNameRequired,
            })}
            value={inputName}
            onChange={handleUserInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isInputNameRequired && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
            className={classNames('input', {
              'is-danger': isInputEmailRequired,
            })}
            value={inputEmail}
            onChange={handleUserEmailInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isInputEmailRequired && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
            className={classNames('textarea', {
              'is-danger': isInputCommentRequired,
            })}
            value={inputComment}
            onChange={handleUserCommentInput}
          />
        </div>

        {isInputCommentRequired && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isCommentAdditionLoading,
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
            onClick={handleResetClick}
          >
            Clear
          </button>
        </div>
      </div>

      {isCommentAdditionError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
    </form>
  );
});
