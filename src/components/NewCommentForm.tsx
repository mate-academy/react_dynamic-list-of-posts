import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  selectedPostId: number;
  handleAddComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  handleAddComment,
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setErrorMsg('Name is required');

      return;
    }

    if (!form.email.trim()) {
      setErrorMsg('Email is required');

      return;
    }

    if (!form.body.trim()) {
      setErrorMsg('Comment text is required');

      return;
    }

    if (form.name.trim().length
      && form.email.trim().length
      && form.body.trim().length) {
      try {
        setIsLoading(true);

        await handleAddComment(
          selectedPostId,
          form.name,
          form.email,
          form.body,
        );
        setForm({
          name: '',
          email: '',
          body: '',
        });
      } catch {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClear = () => {
    setForm({
      name: '',
      email: '',
      body: '',
    });
    setErrorMsg('');
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
              'is-danger': errorMsg && !form.name.trim(),
            })}
            value={form.name}
            onChange={onFieldChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorMsg && !form.name.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorMsg && !form.name.trim() && (
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
            value={form.email}
            className={classNames('input', {
              'is-danger': errorMsg && !form.email.trim(),
            })}
            onChange={onFieldChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorMsg && !form.email.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorMsg && !form.email.trim() && (
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
              'is-danger': errorMsg && !form.body.trim(),
            })}
            onChange={onFieldChange}
          />
        </div>

        {errorMsg && !form.body.trim() && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
