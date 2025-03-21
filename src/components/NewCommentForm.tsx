import React, { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import classNames from 'classnames';
import { addComment } from '../api/commets';
import { Post } from '../types/Post';

type Props = {
  selected: Post | null;
  onAdd: (newComment: Comment) => void;
  onError: (errors: boolean) => void;
};

type ErrorForm = {
  name: boolean;
  email: boolean;
  body: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  selected,
  onAdd,
  onError,
}) => {
  const [error, setError] = useState<ErrorForm>({
    name: false,
    email: false,
    body: false,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setName('');
    setEmail('');
    setError({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    let isValid = true;

    for (const type in Object.fromEntries(formData)) {
      if (!formData.get(type)?.toString()) {
        setError(prev => ({ ...prev, [type]: true }));
        isValid = false;
      }
    }

    if (isValid) {
      setIsLoading(true);

      const newComment: CommentData = {
        name: name,
        email: email,
        body: body,
        postId: selected?.id || 0,
      };

      addComment(newComment)
        .then(response => {
          if (!response || !response.id) {
            throw new Error(`Failed to add comment`);
          }

          setBody('');
          onAdd(response);
        })
        .catch(() => {
          onError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError(prev => ({ ...prev, name: false }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(prev => ({ ...prev, email: false }));
  };

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setError(prev => ({ ...prev, body: false }));
  };

  const handleClear = () => {
    reset();
    setBody('');
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
              'is-danger': error.name,
            })}
            value={name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {error.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.name && (
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
              'is-danger': error.email,
            })}
            value={email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {error.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.email && (
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
              'is-danger': error.body,
            })}
            value={body}
            onChange={handleChangeBody}
          />
        </div>

        {error.body && (
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
