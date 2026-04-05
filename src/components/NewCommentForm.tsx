import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  onSubmit: (commentData: CommentData) => void;
  selectedPost?: Post | null;
  commentButtonLoading?: boolean;
};

export const NewCommentForm = React.memo<Props>(
  ({ onSubmit, selectedPost, commentButtonLoading }) => {
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState(false);

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);

    const [body, setBody] = useState('');
    const [errorBody, setErrorBody] = useState(false);

    const handleNameChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setErrorName(false);
      },
      [],
    );

    const handleEmailChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setErrorEmail(false);
      },
      [],
    );

    const handleBodyChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
        setErrorBody(false);
      },
      [],
    );
    const handleReset = useCallback(() => {
      setName('');
      setEmail('');
      setBody('');
      setErrorName(false);
      setErrorEmail(false);
      setErrorBody(false);
    }, []);

    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorName(!name.trim());
        setErrorEmail(!email.trim());
        setErrorBody(!body.trim());

        if (!name.trim() || !email.trim() || !body.trim()) {
          return;
        }

        if (selectedPost) {
          onSubmit({
            name,
            email,
            body,
            postId: selectedPost.id,
          });
        }

        setBody('');
      },
      [name, email, body, onSubmit, selectedPost],
    );

    return (
      <form
        data-cy="NewCommentForm"
        onSubmit={event => handleSubmit(event)}
        onReset={handleReset}
      >
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name">
            Author Name
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              value={name}
              type="text"
              name="name"
              id="comment-author-name"
              placeholder="Name Surname"
              className={classNames('input', { 'is-danger': errorName })}
              onChange={event => handleNameChange(event)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {errorName && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {errorName && (
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
              value={email}
              type="text"
              name="email"
              id="comment-author-email"
              placeholder="email@test.com"
              className={classNames('input', { 'is-danger': errorEmail })}
              onChange={event => handleEmailChange(event)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {errorEmail && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {errorEmail && (
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
              className={classNames('textarea', { 'is-danger': errorBody })}
              onChange={event => handleBodyChange(event)}
            />
          </div>

          {errorBody && (
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
                'is-loading': commentButtonLoading,
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
  },
);

NewCommentForm.displayName = 'NewCommentForm';
