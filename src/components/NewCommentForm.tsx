import React, { FormEvent, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  currentPost: Post;
  onComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC<Props> = ({
  onComments,
  currentPost,
}) => {
  const [queryName, setQueryName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryText, setQueryText] = useState('');
  const [loading, setLoading] = useState(false);
  const clearErrors = {
    name: '',
    email: '',
    text: '',
  };
  const [errors, setErrors] = useState(clearErrors);

  function addComment({ postId, name, email, body }: Omit<Comment, 'id'>) {
    return client
      .post<Comment>('/comments', { postId, name, email, body })
      .then(newComment => {
        onComments(currentComments => [...currentComments, newComment]);
      });
  }

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const trimmedValues = {
      name: queryName.trim(),
      email: queryEmail.trim(),
      text: queryText.trim(),
    };

    setErrors(prev => ({
      ...prev,
      name: !trimmedValues.name ? 'Name is required' : '',
      email: !trimmedValues.email ? 'Email is required' : '',
      text: !trimmedValues.text ? 'Enter some text' : '',
    }));

    if (!trimmedValues.text || !trimmedValues.email || !trimmedValues.name) {
      return;
    }

    setLoading(true);

    addComment({
      postId: currentPost.id,
      name: trimmedValues.name,
      email: trimmedValues.email,
      body: trimmedValues.text,
    })
      .then(() => setQueryText(''))
      .finally(() => setLoading(false));
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={queryName}
            onChange={e => {
              setQueryName(e.target.value);

              if (errors.name) {
                setErrors(prev => ({ ...prev, name: '' }));
              }
            }}
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
            {errors.name}
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
            className={classNames('input', { 'is-danger': errors.email })}
            value={queryEmail}
            onChange={e => {
              setQueryEmail(e.target.value);

              if (errors.email) {
                setErrors(prev => ({ ...prev, email: '' }));
              }
            }}
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
            {errors.email}
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
            className={classNames('textarea', { 'is-danger': errors.text })}
            value={queryText}
            onChange={e => {
              setQueryText(e.target.value);

              if (errors.text) {
                setErrors(prev => ({ ...prev, text: '' }));
              }
            }}
          />
        </div>

        {errors.text && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.text}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setQueryName('');
              setQueryEmail('');
              setQueryText('');
              setErrors(clearErrors);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  currentPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  onComments: PropTypes.func.isRequired,
};
