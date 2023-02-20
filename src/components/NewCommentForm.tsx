import classNames from 'classnames';
import React from 'react';
import useInput from '../hooks/hooks';
import { Reset } from '../types/Reset';

type Props = {
  onHandleFormSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    reset: (inputType: Reset) => void,
    name: string,
    email: string,
    body: string,
    postId?: number,
  ) => void,
  canselDangerInput: () => void,
  postId?: number,
  isLoadingNewComment: boolean,
  isDangerSubmit: boolean,
  isWarningUpdate: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  onHandleFormSubmit,
  canselDangerInput,
  postId,
  isLoadingNewComment,
  isWarningUpdate,
  isDangerSubmit,
}) => {
  const name = useInput('', canselDangerInput);
  const email = useInput('', canselDangerInput);
  const comment = useInput('', canselDangerInput);
  const isErrorName = isDangerSubmit && !name.value;
  const isErrorEmail = isDangerSubmit && !email.value;
  const isErrorComment = isDangerSubmit && !comment.value;

  const reset = (inputs: Reset) => {
    switch (inputs) {
      case (Reset.all):
        name.reset();
        email.reset();
        comment.reset();
        break;
      default:
        comment.reset();
        break;
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => onHandleFormSubmit(
        event,
        reset,
        name.value,
        email.value,
        comment.value,
        postId,
      )}
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
            className={classNames(
              'input',
              { 'is-danger': isErrorName },
            )}
            {...name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorName && (
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
              { 'is-danger': isErrorEmail },
            )}
            {...email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorEmail && (
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
              { 'is-danger': isErrorComment },
            )}
            {...comment}
          />
        </div>

        {isErrorComment && (
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
              { 'is-loading': isLoadingNewComment },
            )}
          >
            Add
          </button>
          {isWarningUpdate && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Try again
            </p>
          )}
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => reset(Reset.all)}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
