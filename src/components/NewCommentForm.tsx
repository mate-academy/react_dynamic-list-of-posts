import classNames from 'classnames';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Comment, CommentData, ObjectKeys } from '../types/Comment';
import { postComment } from '../api/comments';

type Props = {
  postId: number,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setIsError,
}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputError, setIsInputError] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleAddComments = async (comment: CommentData) => {
    setIsLoading(true);

    const data = {
      postId,
      ...comment,
    };

    try {
      const res = await postComment(data);

      setComments(state => [
        ...state,
        res,
      ]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setBody('');
      setIsInputError({
        name: false,
        email: false,
        body: false,
      });
    }
  };

  const setInputError = (obj: ObjectKeys) => {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      if (!obj[key]) {
        setIsInputError(state => ({
          ...state,
          [key]: true,
        }));
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      name: userName.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    const values = Object.values(newComment);
    const isValuesEmpty = values.some(value => !value);

    if (isValuesEmpty) {
      return setInputError(newComment);
    }

    return handleAddComments(newComment);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;

    setIsInputError(state => ({
      ...state,
      [name]: false,
    }));

    switch (name) {
      case 'name':
        setUserName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'body':
        setBody(value);
        break;

      default:
        break;
    }
  };

  const handleResetClick = () => {
    setUserName('');
    setEmail('');
    setBody('');
    setIsInputError({
      name: false,
      email: false,
      body: false,
    });
  };

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
              'is-danger': isInputError.name,
            })}
            value={userName}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isInputError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isInputError.name && (
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
              'is-danger': isInputError.email,
            })}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isInputError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isInputError.email && (
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
              'is-danger': isInputError.body,
            })}
            value={body}
            onChange={handleChange}
          />
        </div>

        {isInputError.body && (
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
            onClick={handleResetClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
