import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { IErrors } from '../types/IErrors';

export interface FormData {
  postId: number | null,
  name: string;
  email: string;
  body: string;
}

type Props = {
  idOfOpenPost: number
  getComments: (postId: number) => void;
  setError: React.Dispatch<React.SetStateAction<IErrors>>;

};

export const NewCommentForm: React.FC<Props> = ({
  idOfOpenPost,
  getComments,
  setError,
}) => {
  const [queryForm, setQueryForm] = useState<FormData>({
    postId: null,
    name: '',
    email: '',
    body: '',
  });
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setQueryForm({
      ...queryForm,
      [name]: value,
    });
  };

  const handleClearForm = () => {
    setQueryForm({
      postId: null,
      name: '',
      email: '',
      body: '',
    });
  };

  const hendleSubmit = async (
    e: React.SyntheticEvent,
  ) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await client.post('/comments', {
        postId: idOfOpenPost,
        name: queryForm.name,
        email: queryForm.email,
        body: queryForm.body,
      });
    } catch (error) {
      setError((prev) => ({
        ...prev,
        isCommetsEror: true,
      }));
    } finally {
      setIsSending(false);
    }

    getComments(idOfOpenPost);
    handleClearForm();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={hendleSubmit}
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
            className={classNames('input',
              { 'is-danger': isSending && queryForm.name.trim().length === 0 })}
            value={queryForm.name}
            onChange={handleChange}

          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {
            isSending
            && queryForm.name.trim().length === 0
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
          }

        </div>

        {
          isSending
          && queryForm.name.trim().length === 0
            && (
              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            )
        }

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
            className={classNames('input',
              {
                'is-danger': isSending
              && queryForm.email.trim().length === 0,
              })}
            value={queryForm.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isSending
          && queryForm.email.trim().length === 0
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}

        </div>

        {isSending
        && queryForm.email.trim().length === 0
            && (
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
              'is-danger': isSending
              && queryForm.body.trim().length === 0,
            })}
            value={queryForm.body}
            onChange={handleChange}
          />
        </div>

        {isSending
        && queryForm.body.trim().length === 0 && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isSending })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
