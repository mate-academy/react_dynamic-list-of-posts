import React, { useState } from 'react';
import cn from 'classnames';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<Comment>,
};

export const NewCommentForm: React.FC<Props> = ({
  onSubmit = () => {},
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [{ name, email, body }, setCommentData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [{
    name: errName,
    email: errEmail,
    body: errBody,
  }, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const onCommentDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setCommentData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleReset = () => {
    setCommentData({
      name: '',
      email: '',
      body: '',
    });

    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const prepared: CommentData = {
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    if (!prepared.name || !prepared.email || !prepared.body) {
      setErrors({
        name: !prepared.name,
        email: !prepared.email,
        body: !prepared.body,
      });

      return;
    }

    setIsSubmitting(true);
    await onSubmit({
      name: prepared.name,
      email: prepared.email,
      body: prepared.body,
    });
    setIsSubmitting(false);
    setCommentData(prev => ({ ...prev, body: '' }));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div
        className="field"
        data-cy="NameField"
      >

        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': errName,
            })}
            value={name}
            onChange={onCommentDataChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          { errName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        { errName && (
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
            className={cn('input', {
              'is-danger': errEmail,
            })}
            value={email}
            onChange={onCommentDataChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          { errEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        { errEmail && (
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
            className={cn('textarea', {
              'is-danger': errBody,
            })}
            value={body}
            onChange={onCommentDataChange}
          />
        </div>

        { errBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-link', {
                'is-loading': isSubmitting,
              },
            )}
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
      </div>
    </form>
  );
};
