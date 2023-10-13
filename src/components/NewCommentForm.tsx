import classNames from 'classnames';
import React, { useState } from 'react';
import { addComments } from '../api/Comment';
import { Comment } from '../types/Comment';

type Props = {
  postId: number,
  comments: Comment[],
  setComments: (comments: Comment[]) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setComments,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, body } = formData;

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    if (!name.trim() || !email.trim() || !body.trim()) {
      setFormErrors({
        name: !name.trim(),
        email: !email.trim(),
        body: !body.trim(),
      });

      return;
    }

    setIsLoading(true);
    addComments(newComment)
      .then((newCom: Comment) => {
        const newComments = [
          ...comments,
          newCom,
        ];

        setComments(newComments);
      })
      .catch(() => {
        setErrorLoad(true);
      })
      .finally(() => {
        setIsLoading(false);
        if (!errorLoad) {
          setFormData({
            ...formData,
            body: '',
          });
        }
      });
  };

  const handlerClearForm = () => {
    setFormData({
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

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
      onReset={handlerClearForm}
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
            className={classNames('input', {
              'is-danger': formErrors.name,
            })}
            value={formData.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': formErrors.name,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
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

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': formErrors.email,
            })}
            value={formData.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': formErrors.email,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
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

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': formErrors.body,
            })}
            value={formData.body}
            onChange={handleChange}
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
          >
            Clear
          </button>
        </div>

        {errorLoad && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Something went wrong! Try again later!
          </p>
        )}

      </div>
    </form>
  );
};
