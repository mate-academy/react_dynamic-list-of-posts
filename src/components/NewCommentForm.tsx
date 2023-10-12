import classNames from 'classnames';
import React, { useState } from 'react';
import { addComments } from '../api/Comment';
import { Comment } from '../types/Comment';

type Props = {
  postId: number,
  comments: Comment[],
  setComments: (comments: Comment[]) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [textComment, setTextComment] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasTextCommentError, setHasTextCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleChangeTextComment
    = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextComment(event.target.value);
      setHasTextCommentError(false);
    };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasNameError(!name.trim());
    setHasEmailError(!email.trim());
    setHasTextCommentError(!textComment.trim());

    if (name.trim() && email.trim() && textComment.trim()) {
      const newComment = {
        postId,
        name,
        email,
        body: textComment,
      };

      setIsLoading(true);
      addComments(newComment)
        .then((newCom: Comment) => {
          const newComments = [
            ...comments,
            newCom,
          ];

          setComments(newComments);
        })
        .finally(() => {
          setIsLoading(false);
          setTextComment('');
        });
    }
  };

  const handlerClearForm = () => {
    setName('');
    setHasNameError(false);
    setEmail('');
    setHasEmailError(false);
    setTextComment('');
    setHasTextCommentError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
      onReset={handlerClearForm}
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
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            value={name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': hasNameError,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {hasNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
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
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
            value={email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': hasEmailError,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {hasEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
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
            className={classNames('textarea', {
              'is-danger': hasTextCommentError,
            })}
            value={textComment}
            onChange={handleChangeTextComment}
          />
        </div>

        {hasTextCommentError && (
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
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
