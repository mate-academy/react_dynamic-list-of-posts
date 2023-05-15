import React, { FC, memo, useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  onAdd: (comment: Comment) => void;
  isSubmitted: boolean;
  setSubmitted: (status: boolean) => void;
  isLoading: boolean,
  onLoad: (status: boolean) => void;
}

export const NewCommentForm: FC<Props> = memo(({
  postId,
  onAdd,
  isSubmitted,
  setSubmitted,
  isLoading,
  onLoad,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const allFieldsAreValid = name && email && commentBody;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    onLoad(true);

    if (!allFieldsAreValid) {
      setSubmitted(true);
      onLoad(false);

      return;
    }

    const comment = {
      id: 0,
      postId,
      name,
      email,
      body: commentBody,
    };

    onAdd(comment);
    setCommentBody('');
  };

  const handleReset = () => {
    setEmail('');
    setCommentBody('');
    setName('');
    setSubmitted(false);
  };

  const validateField = (inputValue: string) => !inputValue && isSubmitted;

  return (
    <form
      onSubmit={handleSubmit}
      data-cy="NewCommentForm"
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
            className={cn('input', { 'is-danger': validateField(name) })}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {validateField(name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validateField(name) && (
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
            className={cn('input', { 'is-danger': validateField(email) })}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {validateField(email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validateField(email) && (
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
            className={cn(
              'textarea',
              { 'is-danger': validateField(commentBody) },
            )}
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
          />
        </div>

        {validateField(commentBody) && (
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
              'button is-link',
              { 'is-loading': isLoading },
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
