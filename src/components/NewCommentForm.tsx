import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  setError: (error: boolean) => void;
  getComments: () => Promise<void>;
  setTempComments?: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setError,
  getComments,
  setTempComments,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handelSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setErrorForm([]);
    setError(false);

    const errors = [];

    if (name.trim() === '') {
      errors.push('name');
    }

    if (email.trim() === '') {
      errors.push('email');
    }

    if (body.trim() === '') {
      errors.push('body');
    }

    setErrorForm(errors);

    if (errors.length > 0) {
      setLoading(false);

      return;
    }

    try {
      await client.post<Comment>('/comments', {
        postId,
        name: name,
        email: email,
        body: body,
      });

      if (setTempComments) {
        setTempComments((prev: Comment[]) => [
          ...prev,
          {
            id: new Date().getTime(),
            postId,
            name: name,
            email: email,
            body: body,
          },
        ]);
      }

      await getComments();
      setBody('');
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrorForm([]);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handelSubmit}>
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
            className={`input ${errorForm.includes('name') && 'is-danger'}`}
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (errorForm.includes('name')) {
                setErrorForm(prev => prev.filter(item => item !== 'name'));
              }
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorForm.includes('name') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorForm.includes('name') && (
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
            className={`input ${errorForm.includes('email') && 'is-danger'}`}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (errorForm.includes('email')) {
                setErrorForm(prev => prev.filter(item => item !== 'email'));
              }
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorForm.includes('email') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorForm.includes('email') && (
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
            className={`textarea ${errorForm.includes('body') && 'is-danger'}`}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              if (errorForm.includes('body')) {
                setErrorForm(prev => prev.filter(item => item !== 'body'));
              }
            }}
          />
        </div>

        {errorForm.includes('body') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Comment text is required
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${loading ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
