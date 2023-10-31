import cn from 'classnames';
import React, { FormEvent, useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { addComment } from '../api/posts';

type Props = {
  postId: number | undefined,
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>,
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  setComments,
  postId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [checkFieldName, setCheckFieldName] = useState(false);
  const [checkFieldEmail, setCheckFieldEmail] = useState(false);
  const [checkFieldBody, setCheckFieldBody] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleErrorSet = (errMessage: string) => {
    setError(errMessage);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setCheckFieldName(false);
    setCheckFieldEmail(false);
    setCheckFieldBody(false);
  };

  useEffect(() => {
    handleClear();
  }, [postId]);

  const nameTrim = name.trim();
  const emailTrim = email.trim();
  const bodyTrim = body.trim();

  const handleCommentFormSubmit = async (event?: FormEvent) => {
    event?.preventDefault();
    setCheckFieldName(true);
    setCheckFieldEmail(true);
    setCheckFieldBody(true);

    if (
      !nameTrim
      || !emailTrim
      || !bodyTrim
    ) {
      return;
    }

    try {
      setIsLoading(true);
      const newComment = {
        postId,
        name,
        email,
        body,
      };

      const loadComment = await addComment(newComment);

      setComments((state) => {
        if (state) {
          return [...state, loadComment];
        }

        return [loadComment];
      });
      setCheckFieldBody(false);
      setBody('');
    } catch {
      handleErrorSet('something went wrong');
    }

    setIsLoading(false);
  };

  return (
    <>
      <div>
        {error}
      </div>
      <form
        data-cy="NewCommentForm"
        onSubmit={handleCommentFormSubmit}
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
              className={cn('input',
                {
                  'is-danger': !nameTrim && checkFieldName,
                })}
              value={name}
              onChange={(event) => {
                setCheckFieldName(false);
                setName(event.target.value);
              }}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            {!nameTrim && checkFieldName && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>
          {!nameTrim && checkFieldName && (
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
              className={cn('input',
                {
                  'is-danger': !emailTrim && checkFieldEmail,
                })}
              value={email}
              onChange={(event) => {
                setCheckFieldEmail(false);
                setEmail(event.target.value);
              }}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            {!emailTrim && checkFieldEmail && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>
          {!emailTrim && checkFieldEmail && (
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
              className={cn('input',
                {
                  'is-danger': !bodyTrim && checkFieldBody,
                })}
              value={body}
              onChange={(event) => {
                setCheckFieldBody(false);
                setBody(event.target.value);
              }}
            />
          </div>
          {!bodyTrim && checkFieldBody && (
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
                'is-link',
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
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </>
  );
});
