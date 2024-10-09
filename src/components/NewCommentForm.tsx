import React, { FormEvent, useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  onAdd: (val: Omit<Comment, 'id'>) => Promise<void>;
  selectedPost: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({ onAdd, selectedPost }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [name, setName] = useState('');
  const [isErrorName, setIsErrorName] = useState(false);

  const [email, setEmail] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const [comment, setComment] = useState('');
  const [isErrorComment, setIsErrorComment] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsErrorName(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsErrorEmail(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setIsErrorComment(false);
  };

  const handleReset = () => {
    setComment('');
    setEmail('');
    setName('');
    setIsErrorComment(false);
    setIsErrorEmail(false);
    setIsErrorName(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsErrorName(!name);
    setIsErrorEmail(!email);
    setIsErrorComment(!comment);

    if (!name || !email || !comment) {
      return;
    }

    setIsSubmiting(true);
    onAdd({
      name: name.trim(),
      email: email.trim(),
      body: comment.trim(),
      postId: selectedPost?.id || 0,
    }).finally(() => {
      setComment('');
      setIsSubmiting(false);
      setIsErrorComment(false);
      setIsErrorEmail(false);
      setIsErrorName(false);
    });
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
            className={classNames('input', { 'is-danger': isErrorName })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorName && (
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
            className={classNames('input', { 'is-danger': isErrorEmail })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorEmail && (
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
            className={classNames('textarea', { 'is-danger': isErrorComment })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        {isErrorComment && (
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
              'is-loading': isSubmiting,
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
            disabled={isSubmiting}
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
