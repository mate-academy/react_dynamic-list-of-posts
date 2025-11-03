import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>;
  selectedPost: Post;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  selectedPost,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const handleChange =
    (field: 'name' | 'email' | 'comment') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;

      if (field === 'name') {
        setName(value);
      }

      if (field === 'email') {
        setEmail(value);
      }

      if (field === 'comment') {
        setBody(value);
      }

      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({
      name: '',
      email: '',
      comment: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: name.trim() ? '' : 'Name is required',
      email: email.trim() ? '' : 'Email is required',
      comment: body.trim() ? '' : 'Comment text is required',
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);

    if (hasError) {
      return;
    }

    setIsLoading(true);

    client
      .post<Comment>('/comments', {
        postId: selectedPost.id,
        name,
        email,
        body,
      })
      .then(res => {
        setComments(prev => (prev ? [...prev, res] : [res]));
        setBody('');
      })
      .catch(() => alert('Something went wrong, try to add comment later!'))
      .finally(() => setIsLoading(false));
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
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(`input`, { 'is-danger': errors.name })}
            onChange={handleChange('name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(`input`, { 'is-danger': errors.email })}
            onChange={handleChange('email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            value={body}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames(`textarea`, { 'is-danger': errors.comment })}
            onChange={handleChange('comment')}
          />
        </div>

        {errors.comment && (
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
