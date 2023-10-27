import React, { useState, useContext } from 'react';
import cn from 'classnames';
import * as getService from '../../services/AppServices';
import { AppContext } from '../AppContext';

type Props = {
  setErrorMessage: (message: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({ setErrorMessage }) => {
  const [formDate, setFormDate] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const [loading, setLoading] = useState(false);
  const { setComments, selectedPost } = useContext(AppContext);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormDate((prevData) => ({ ...prevData, [name]: value.trimStart() }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const reset = () => {
    setFormDate({
      name: '',
      email: '',
      body: '',
    });

    setFormErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { name, email, body } = formDate;

    setFormErrors((prevErrors) => ({ ...prevErrors, name: !name }));
    setFormErrors((prevErrors) => ({ ...prevErrors, email: !email }));
    setFormErrors((prevErrors) => ({ ...prevErrors, body: !body }));

    if (!name || !email || !body) {
      return;
    }

    setLoading(true);

    const newComment = {
      postId: selectedPost?.id,
      name,
      email,
      body,
    };

    getService.getCreateComment(newComment)
      .then(newCommentFromServer => {
        setComments(currentComments => {
          return [...currentComments, newCommentFromServer];
        });
        setFormDate((prevData) => ({ ...prevData, body: '' }));
      })
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => {
        setLoading(false);
      });
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

        <div className={cn('control has-icons-left', {
          'has-icons-right': formErrors.name,
        })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': formErrors.name })}
            value={formDate.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className={cn('control has-icons-left', {
          'has-icons-right': formErrors.email,
        })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': formErrors.email })}
            value={formDate.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className={cn('control', {
          'has-icons-right': formErrors.body,
        })}
        >
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('input', { 'is-danger': formErrors.body })}
            value={formDate.body}
            onChange={handleInputChange}
          />
        </div>

        {formErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': loading })}
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
