import React, { FormEvent, useState } from 'react';
import cn from 'classnames';
import { addComment } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  updateComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setError: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  updateComments,
  setError,
}) => {
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [newCommentField, setNewCommentField] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorComment, setErrorComment] = useState(false);

  function hanlderOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.target.name === 'name') {
      setNameField(event.target.value);
      setErrorName(false);
    }

    if (event.target.name === 'email') {
      setEmailField(event.target.value);
      setErrorEmail(false);
    }

    if (event.target.name === 'body') {
      setNewCommentField(event.target.value);
      setErrorComment(false);
    }
  }

  const clearComment = () => {
    setNameField('');
    setEmailField('');
    setNewCommentField('');
    setErrorName(false);
    setErrorEmail(false);
    setErrorComment(false);
  };

  function addNewComment(event: FormEvent) {
    event.preventDefault();

    setErrorName(!nameField);
    setErrorEmail(!emailField);
    setErrorComment(!newCommentField);

    if (errorName || errorEmail || errorComment) {
      return;
    }

    setLoading(true);

    addComment({
      postId,
      name: nameField,
      email: emailField,
      body: newCommentField,
    })
      .then(newComment =>
        updateComments(currentComments => [...currentComments, newComment]),
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setNewCommentField('');
      });
  }

  return (
    <form data-cy="NewCommentForm">
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
            className={cn('input', { 'is-danger': errorName })}
            value={nameField}
            onChange={hanlderOnChange}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': errorEmail })}
            value={emailField}
            onChange={hanlderOnChange}
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
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': errorComment })}
            value={newCommentField}
            onChange={hanlderOnChange}
          />
        </div>

        {errorComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': loading })}
            onClick={addNewComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearComment}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
