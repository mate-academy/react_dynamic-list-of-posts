import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  onSubmit: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
  selectedPost: Post | null;
}

export const NewCommentForm: React.FC<Props> = ({ onSubmit, selectedPost }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>();

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPost) {
          return;
        }

        const newErrors: typeof errors = {};

        if (!name.trim()) {
          newErrors.name = 'Name is required';
        }

        if (!email.trim() || !email.trim().includes('@')) {
          newErrors.email = 'Email is required';
        }

        if (!body.trim()) {
          newErrors.body = 'Enter some text';
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);

          return;
        }

        setIsAddLoading(true);
        onSubmit({
          postId: selectedPost.id,
          name: name,
          email: email,
          body: body,
        }).finally(() => {
          setIsAddLoading(false);
          setErrors({});
          setBody('');
        });
      }}
      onReset={() => {
        setName('');
        setEmail('');
        setBody('');
        setErrors({});
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
            className={classNames('input', { 'is-danger': errors?.name })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrors({ ...errors, name: undefined });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors?.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors?.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors?.name}
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
            className={classNames('input', { 'is-danger': errors?.email })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: undefined });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors?.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors?.email && (
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
            className={classNames('textarea', { 'is-danger': errors?.body })}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setErrors({ ...errors, body: undefined });
            }}
          />
        </div>

        {errors?.body && (
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
              'is-loading': isAddLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
