import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { TRootDispatch, TRootState } from '../../redux/store';
import { EStatus } from '../../types/Status.enum';
import { fetchNewComment } from '../../redux/slices/commentSlice';

type TProps = {
  postId: number;
};

// eslint-disable-next-line max-len
const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const NewCommentForm: React.FC<TProps> = ({ postId }) => {
  const { newCommentStatus } = useSelector(
    (state: TRootState) => state.comments,
  );

  const dispatch: TRootDispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const isNameDefined = () => name;
  const isEmailDefined = () => email;
  const isEmailCorrect = () => pattern.test(email);
  const isBodyDefined = () => body;

  const checkName = () => {
    if (!isNameDefined()) {
      setNameError('Name is required');

      return;
    }

    setNameError('');
  };

  const checkEmail = () => {
    if (!isEmailDefined()) {
      setEmailError('Email is required');

      return;
    }

    if (!isEmailCorrect()) {
      setEmailError('Email is invalid');

      return;
    }

    setEmailError('');
  };

  const checkBody = () => {
    if (!isBodyDefined()) {
      setBodyError('Enter some text');

      return;
    }

    setBodyError('');
  };

  const checkAllFields = () => {
    checkName();
    checkEmail();
    checkBody();
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError('');
    setEmailError('');
    setBodyError('');
  };

  const allCorrect = isNameDefined()
    && isEmailDefined()
    && isBodyDefined()
    && isEmailCorrect();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!allCorrect) {
      checkAllFields();

      return;
    }

    dispatch(fetchNewComment({
      name,
      email,
      body,
      postId,
    }));

    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            value={name}
            onChange={event => setName(event.target.value)}
            onBlur={checkName}
            className={classNames(
              'input',
              {
                'is-danger': nameError,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameError}
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
            value={email}
            onChange={event => setEmail(event.target.value)}
            onBlur={checkEmail}
            className={classNames(
              'input',
              {
                'is-danger': emailError,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {emailError}
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
            value={body}
            onChange={event => setBody(event.target.value)}
            onBlur={checkBody}
            className={classNames(
              'input',
              {
                'is-danger': bodyError,
              },
            )}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {bodyError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              {
                'is-loading': newCommentStatus === EStatus.PENDING,
              },
            )}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
