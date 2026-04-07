import React, { useRef, useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import PropTypes from 'prop-types';

type Props = {
  onAdd: (newComment: Comment) => void;
  postId: number;
};

type FormErrors = {
  name: string;
  email: string;
  body: string;
  server: string;
};

export const NewCommentForm: React.FC<Props> = ({ onAdd, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FormErrors>({
    name: '',
    email: '',
    body: '',
    server: '',
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => {
        event.preventDefault();

        const newErrors: FormErrors = {
          name: name.trim() ? '' : 'Name is required',
          email: email.trim() ? '' : 'Email is required',
          body: body.trim() ? '' : 'Comment is required',
          server: '',
        };

        setError(newErrors);

        if (newErrors.name || newErrors.email || newErrors.body) {
          return;
        }

        setIsLoading(true);

        const newComment = {
          id: Date.now(),
          postId,
          name,
          email,
          body,
        };

        client
          .post<Comment>('/comments', newComment)
          .then(created => {
            onAdd({
              ...newComment,
              id: created.id,
            });
            setBody('');
            setError({ name: '', email: '', body: '', server: '' });
            textareaRef.current?.focus();
          })
          .catch(() => {
            setError(prev => ({
              ...prev,
              server: 'Failed to add comment. Please try again later.',
            }));
          })
          .finally(() => setIsLoading(false));
      }}
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
            className={`input ${error.name ? 'is-danger' : ''}`}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setError(prev => ({ ...prev, name: '' }));
            }}
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
            {error.name}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@example.com"
            className={`input ${error.email ? 'is-danger' : ''}`}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setError(prev => ({ ...prev, email: '' }));
            }}
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
            {error.email}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment
        </label>
        <div className="control">
          <textarea
            ref={textareaRef}
            id="comment-body"
            name="body"
            className={`textarea ${error.body ? 'is-danger' : ''}`}
            placeholder="Type comment here"
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setError(prev => ({ ...prev, body: '' }));
            }}
          />
        </div>
        {error.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {error.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={isLoading}
            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setName('');
              setEmail('');
              setBody('');
              setError({ name: '', email: '', body: '', server: '' });
            }}
          >
            Clear
          </button>
        </div>
      </div>
      {error.server && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {error.server}
        </p>
      )}
    </form>
  );
};

NewCommentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
