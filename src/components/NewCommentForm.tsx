/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import React, { useState } from 'react';
import { addComment } from '../api/api-comments';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialDataInputs = {
  name: '',
  email: '',
  body: '',
};

const initialDataErrors = {
  nameError: false,
  emailError: false,
  bodyError: false,
};

const initialData = {
  ...initialDataInputs,
  ...initialDataErrors,
};

type DataFields = 'name' | 'email' | 'body';

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setIsError,
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  function handleReset() {
    setData(initialData);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      data.name.trim() === '' ||
      data.email.trim() === '' ||
      data.body.trim() === ''
    ) {
      setData(prevData => ({
        ...prevData,
        nameError: data.name.trim() === '',
        emailError: data.email.trim() === '',
        bodyError: data.body.trim() === '',
      }));

      return;
    }

    setLoading(true);
    try {
      const postFromServer = await addComment({
        postId: post.id,
        name: data.name,
        email: data.email,
        body: data.body,
      });

      setComments(prevComments => [...prevComments, postFromServer]);
      setData(prevData => ({ ...prevData, body: '', ...initialDataErrors }));
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleInput(
    field: DataFields,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setData(prevData => ({
      ...prevData,
      [field]: event.target.value,
      [`${field}Error`]: false,
    }));
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={event => handleSubmit(event)}>
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
              'is-danger': data.nameError,
            })}
            onChange={event => {
              handleInput('name', event);
            }}
            value={data.name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {data.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {data.nameError && (
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
              'is-danger': data.emailError,
            })}
            onChange={event => {
              handleInput('email', event);
            }}
            value={data.email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {data.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {data.emailError && (
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
            className={classNames('input', {
              'is-danger': data.bodyError,
            })}
            onChange={event => {
              handleInput('body', event);
            }}
            value={data.body}
          />
        </div>

        {data.bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={() => handleReset()}
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
