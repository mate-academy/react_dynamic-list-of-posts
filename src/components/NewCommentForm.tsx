/* eslint-disable @typescript-eslint/no-unused-expressions */
import classNames from 'classnames';
import React, { useState, SetStateAction, ChangeEvent } from 'react';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  setComments: (comment: SetStateAction<Comment[]>) => void;
  setError: (message: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const submitNewComment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !body) {
      setInputErrors({
        name: !name,
        email: !email,
        body: !body,
      });
    }

    setIsLoading(true);
    try {
      const newComment = await addComment(postId, name, email, body);

      setComments(comments => [...comments, newComment]);
    } catch {
      setError('Unable to add comment');
      setComments([]);
    } finally {
      setBody('');
      setIsLoading(false);
    }
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setBody('');

    setInputErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const fieldChangeName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    inputErrors.name
      ? setInputErrors(comment => ({
        ...comment,
        name: false,
      }))
      : setName(event.target.value);
  };

  const fieldChangeEmail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    inputErrors.email
      ? setInputErrors(comment => ({
        ...comment,
        email: false,
      }))
      : setEmail(event.target.value);
  };

  const fieldChangeBody = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    inputErrors.body
      ? setInputErrors(comment => ({
        ...comment,
        body: false,
      }))
      : setBody(event.target.value);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={submitNewComment}>
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
            className={classNames('input',
              { 'is-danger': inputErrors.name })}
            value={name}
            onChange={fieldChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputErrors.name && (
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
            className={classNames('input',
              { 'is-danger': inputErrors.email })}
            value={email}
            onChange={fieldChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputErrors.email && (
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
            className={classNames('textarea',
              { 'is-danger': inputErrors.body })}
            value={body}
            onChange={fieldChangeBody}
          />
        </div>

        {inputErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
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
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
