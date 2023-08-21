import React, { useState } from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment } from '../api/ApiMethods';

type Props = {
  openPost: Post | null,
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setHasError: (value: boolean) => void,
  setOpenForm: (value: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  openPost,
  setPostComments,
  setHasError,
  setOpenForm,
}) => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const checkInputName = !formInputs.name.trim() && touched;
  const checkEmailName = !formInputs.email.trim() && touched;
  const checkBodyName = !formInputs.body.trim() && touched;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTouched(false);
    setFormInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setTouched(false);
    setFormInputs({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (openPost
      && formInputs.name.trim()
      && formInputs.email.trim()
      && formInputs.body.trim()
    ) {
      const newComment = { ...formInputs, postId: openPost.id };

      setLoading(true);

      addComment(newComment)
        .then(res => {
          setPostComments(prev => ([...prev, res]));
          setFormInputs(prev => ({ ...prev, body: '' }));
          setTouched(false);
        })
        .catch(() => {
          setHasError(true);
          setOpenForm(false);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
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
            className={classNames('input', { 'is-danger': checkInputName })}
            value={formInputs.name}
            onChange={handleChange}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {checkInputName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {checkInputName && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': checkEmailName })}
            value={formInputs.email}
            onChange={handleChange}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {checkEmailName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {checkEmailName && (
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
            className={classNames('textarea', { 'is-danger': checkBodyName })}
            value={formInputs.body}
            onChange={handleChange}
            required
          />
        </div>

        {checkBodyName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            onClick={() => setTouched(true)}
            className={classNames('button', 'is-link', {
              'is-loading': loading,
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
// is-loading
