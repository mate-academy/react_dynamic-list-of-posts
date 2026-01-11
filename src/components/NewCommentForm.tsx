import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../api/fetchComments';
import { Comment, CommentData } from '../types/Comment';
import { Errors } from '../types/Errors';

interface NewCommentProps {
  addNewComment: (comment: Comment) => void;
  postId: number;
}

export const NewCommentForm: React.FC<NewCommentProps> = ({
  addNewComment,
  postId,
}) => {
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [commentBody, setCommentBody] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: null,
    email: null,
    body: null,
    submit: null,
  });

  const handleInputChange = (field: keyof Errors, value: string) => {
    switch (field) {
      case 'name':
        setAuthorName(value);
        break;
      case 'email':
        setAuthorEmail(value);
        break;
      case 'body':
        setCommentBody(value);
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: prev[field] && value.trim() ? null : prev[field],
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: Errors = {
      name: null,
      email: null,
      body: null,
      submit: null,
    };
    let hasError = false;

    if (!authorName.trim()) {
      newErrors.name = 'Name is required';
      hasError = true;
    }

    if (!authorEmail.trim()) {
      newErrors.email = 'Email is required';
      hasError = true;
    }

    if (!commentBody.trim()) {
      newErrors.body = 'Enter some text';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);

      return;
    }

    setLoading(true);

    const newComment: CommentData & { postId: number } = {
      name: authorName,
      email: authorEmail,
      body: commentBody,
      postId,
    };

    createComment(newComment)
      .then(createdComment => {
        addNewComment(createdComment);
        setCommentBody('');
      })
      .catch(() => {
        setErrors(prev => ({
          ...prev,
          submit: 'Something went wrong. Try again.',
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReset = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setErrors({ name: null, email: null, body: null, submit: null });
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
            value={authorName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { ' is-danger': errors.name })}
            onChange={e => handleInputChange('name', e.target.value)}
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
            value={authorEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { ' is-danger': errors.email })}
            onChange={e => handleInputChange('email', e.target.value)}
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
            value={commentBody}
            placeholder="Type comment here"
            className={classNames('textarea', { ' is-danger': errors.body })}
            onChange={e => handleInputChange('body', e.target.value)}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
      {errors.submit && (
        <p className="help is-danger" data-cy="SubmitError">
          {errors.submit}
        </p>
      )}
    </form>
  );
};
