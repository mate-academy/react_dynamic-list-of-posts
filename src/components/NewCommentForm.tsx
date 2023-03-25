import classNames from 'classnames';
import React, { FormEvent, useState, ChangeEvent } from 'react';

import { setComment } from '../api/api';

import { Errors } from '../types/Errors';
import { Comment } from '../types/Comment';
import { useValues } from '../customState';

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
  const name = useValues('');
  const email = useValues('');
  const textarea = useValues('');
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors[]>([]);

  const postedComment = () => {
    setLoading(true);

    const newComment: Comment = {
      id: commentsLength + 1,
      postId,
      name: name.currValue,
      email: email.currValue,
      body: textarea.currValue,
    };

    setComment(newComment)
      .then(() => {
        textarea.changeValue('');
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

    if (!name.currValue.length) {
      setErrors(currErrors => ([...currErrors, Errors.NAME]));
    }

    if (!email.currValue.length) {
      setErrors(currErrors => ([...currErrors, Errors.EMAIL]));
    }

    if (!textarea.currValue.length) {
      setErrors(currErrors => ([...currErrors, Errors.TEXTAREA]));
    }

    postedComment();
  };

  const onChangName = (e: ChangeEvent<HTMLInputElement>) => {
    filteredErrors(Errors.NAME);
    name.changeValue(e.target.value);
  };

  const onChangEmail = (e: ChangeEvent<HTMLInputElement>) => {
    filteredErrors(Errors.EMAIL);
    email.changeValue(e.target.value);
  };

  const onChangTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    filteredErrors(Errors.TEXTAREA);
    textarea.changeValue(e.target.value);
  };

  const onReset = () => {
    setErrors([]);
    name.changeValue('');
    email.changeValue('');
    textarea.changeValue('');
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
            value={name.currValue}
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
            value={email.currValue}
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
            value={textarea.currValue}
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
