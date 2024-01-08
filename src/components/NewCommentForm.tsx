import React, { useState } from 'react';
import cn from 'classnames';
import { usePostContext } from '../context/PostProvider';

export const NewCommentForm: React.FC = () => {
  const { handleAddComment, addPostLoading } = usePostContext();

  const [query, setQuery] = useState({
    name: '',
    mail: '',
    comment: '',
  });

  const [errors, setErrors] = useState({
    nameError: false,
    mailError: false,
    commentError: false,
  });

  const FIELDS: (keyof typeof query)[] = ['name', 'mail', 'comment'];

  const handleClearForm = () => {
    setQuery({
      name: '',
      mail: '',
      comment: '',
    });
    setErrors({
      nameError: false,
      mailError: false,
      commentError: false,
    });
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    FIELDS.forEach((field: keyof typeof query) => {
      if (query[field] === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`${field}Error`]: true,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`${field}Error`]: false,
        }));
      }
    });

    const isValid = FIELDS.every(
      (field: keyof typeof query) => query[field].trim() !== '',
    );

    if (isValid) {
      handleAddComment(query.name, query.mail, query.comment);
      setQuery({
        name: query.name,
        mail: query.mail,
        comment: '',
      });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={
        (event) => handleSubmitForm(event)
      }
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
            className={cn('input', { 'is-danger': errors.nameError })}
            value={query.name}
            onChange={(event) => setQuery(
              { ...query, name: event.target.value },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.nameError && (
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
            className={cn('input', { 'is-danger': errors.mailError })}
            value={query.mail}
            onChange={(event) => setQuery(
              { ...query, mail: event.target.value },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.mailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.mailError && (
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
            className={cn('textarea', { 'is-danger': errors.commentError })}
            value={query.comment}
            onChange={(event) => setQuery(
              { ...query, comment: event.target.value },
            )}
          />
        </div>

        {errors.commentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': addPostLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
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
