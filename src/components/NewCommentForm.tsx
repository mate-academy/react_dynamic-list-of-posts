/* eslint-disable react/button-has-type */
import React, { FormEvent, useState } from 'react';
import cn from 'classnames';
import { Store } from '../store';
import { client } from '../utils/fetchClient';

export const NewCommentForm: React.FC = () => {
  const {
    selectedPost,
    setPostComments,
    setPostCommentsError,
    setPostCommentsLoading,
  } = Store();

  const [authorName, setAuthorName] = useState('');
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [authorEmail, setAuthorEmail] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);

  const commentHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setComment(() => e.target.value.trim());
    setIsCommentEmpty(false);
  };

  const emailFieldHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setAuthorEmail(() => e.target.value.trim());
    setIsEmailEmpty(false);
  };

  const nameHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setAuthorName(() => e.target.value.trim());
    setIsNameEmpty(false);
  };

  const resetForm = () => {
    setAuthorName('');
    setIsNameEmpty(false);
    setAuthorEmail('');
    setIsEmailEmpty(false);
    setComment('');
    setIsCommentEmpty(false);
  };

  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formFieldsFilled = false;

    if (!authorName) {
      formFieldsFilled = true;
      setIsNameEmpty(true);
    }

    if (!authorEmail) {
      formFieldsFilled = true;
      setIsEmailEmpty(true);
    }

    if (!comment) {
      formFieldsFilled = true;
      setIsCommentEmpty(true);
    }

    if (formFieldsFilled) {
      return;
    }

    setSendLoading(true);

    client.post('/comments', {
      postId: selectedPost?.id,
      name: authorName,
      email: authorEmail,
      body: comment,
    })
      .then(() => {
        client
          .get(`/comments?postId=${selectedPost?.id}`)
          .then((res) => {
            if (Array.isArray(res)) {
              setPostComments(res);
            } else {
              throw res;
            }
          })
          .catch((res) => {
            setPostCommentsError(true);
            Error(res);
          })
          .finally(() => {
            setPostCommentsLoading(false);
          });
      })
      .then(() => setComment(''))
      .catch(err => new Error(err.message))
      .finally(() => setSendLoading(false));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={formHandler}
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
            className={cn('input', { 'is-danger': isNameEmpty })}
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            onBlur={nameHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={
              cn('icon', 'is-small', 'is-right',
                { 'has-text-danger': isNameEmpty })
            }
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {isNameEmpty && (
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
            className={cn('input', { 'is-danger': isEmailEmpty })}
            value={authorEmail}
            onChange={e => setAuthorEmail(e.target.value)}
            onBlur={emailFieldHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={
              cn('icon', 'is-small', 'is-right',
                { 'has-text-danger': isEmailEmpty })
            }
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {isEmailEmpty && (
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
            value={comment}
            className={cn('textarea', { 'is-danger': isCommentEmpty })}
            onChange={e => setComment(e.target.value)}
            onBlur={commentHandler}
          />
        </div>

        {isCommentEmpty && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', { 'is-loading': sendLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
