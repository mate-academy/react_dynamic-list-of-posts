import classNames from 'classnames';
import React, { FormEvent, useState, ChangeEvent } from 'react';

import { setComment } from '../api/api';

import { Errors } from '../types/Errors';
import { Comment } from '../types/Comment';

function validateEmail(str: string) {
  const reg = /\S+@\S+\.\S+/;

  return reg.test(str);
}

type Props = {
  postId: number;
  onClickHandleAdd: (comment: Comment) => void;
  commentsLength: number;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onClickHandleAdd,
  commentsLength,
}) => {
  const [input, setInput] = useState({ name: '', email: '', textarea: '' });
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors[]>([]);

  const postedComment = () => {
    setLoading(true);

    const newComment: Comment = {
      id: commentsLength + 1,
      postId,
      name: input.name,
      email: input.email,
      body: input.textarea,
    };

    setComment(newComment)
      .then(() => {
        setInput(prev => ({ ...prev, textarea: '' }));
        onClickHandleAdd(newComment);
      })
      .finally(() => setLoading(false));
  };

  const filteredErrors = (errorName: Errors) => {
    setErrors(currErrors => currErrors.filter(error => (
      error !== errorName
    )));
  };

  const checkErrors = (errorName: Errors) => errors.includes(errorName);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isName = input.name.length;
    const isEmail = input.email.length;
    const isTextarea = input.textarea.length;
    const isValidatedEmail = validateEmail(input.email);

    if (!isName) {
      setErrors(currErrors => ([...currErrors, Errors.NAME]));
    }

    if (!isEmail || !isValidatedEmail) {
      setErrors(currErrors => ([...currErrors, Errors.EMAIL]));
    }

    if (!isTextarea) {
      setErrors(currErrors => ([...currErrors, Errors.TEXTAREA]));
    }

    if (isName && isEmail && isTextarea && isValidatedEmail) {
      postedComment();
    }
  };

  const onChangName = (e: ChangeEvent<HTMLInputElement>) => {
    filteredErrors(Errors.NAME);
    setInput(prev => ({ ...prev, name: e.target.value }));
  };

  const onChangEmail = (e: ChangeEvent<HTMLInputElement>) => {
    filteredErrors(Errors.EMAIL);
    setInput(prev => ({ ...prev, email: e.target.value }));
  };

  const onChangTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    filteredErrors(Errors.TEXTAREA);
    setInput(prev => ({ ...prev, textarea: e.target.value }));
  };

  const onReset = () => {
    setErrors([]);
    setInput({ name: '', email: '', textarea: '' });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={classNames(
              'input',
              { 'is-danger': checkErrors(Errors.NAME) },
            )}
            value={input.name}
            onChange={onChangName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {checkErrors(Errors.NAME) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {checkErrors(Errors.NAME) && (
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
            className={classNames(
              'input',
              { 'is-danger': checkErrors(Errors.EMAIL) },
            )}
            value={input.email}
            onChange={onChangEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {checkErrors(Errors.EMAIL) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {checkErrors(Errors.EMAIL) && (
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
            className={classNames(
              'textarea',
              { 'is-danger': checkErrors(Errors.TEXTAREA) },
            )}
            value={input.textarea}
            onChange={onChangTextarea}
          />
        </div>

        {checkErrors(Errors.TEXTAREA) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
