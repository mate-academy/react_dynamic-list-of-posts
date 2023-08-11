import React, { useState } from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment } from '../api/ApiMethods';

type Props = {
  openPost: Post | null,
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setHasError: (v: boolean) => void,
  setOpenForm: (v: boolean) => void,
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
  const [tuched, setTuched] = useState(false);

  const checkInputName = !formInputs.name.trim() && tuched;
  const checkEmailName = !formInputs.email.trim() && tuched;
  const checkBodyName = !formInputs.body.trim() && tuched;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTuched(false);
    setFormInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormInputs({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (openPost) {
      const newComment = { ...formInputs, postId: openPost.id };

      setLoading(true);

      addComment(newComment)
        .then(res => {
          setPostComments(prev => ([...prev, res]));
          setFormInputs(prev => ({ ...prev, body: '' }));
          setTuched(false);
        })
        .catch(() => {
          setHasError(true);
          setOpenForm(false);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(e) => handleSubmitForm(e)}>
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
            onChange={(e) => handleChange(e)}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': checkEmailName })}
            value={formInputs.email}
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
            onClick={() => setTuched(true)}
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
