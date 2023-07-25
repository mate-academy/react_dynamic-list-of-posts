import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  loadComments: (postId: number) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, loadComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(false);
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setTextError(false);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setText('');
    setNameError(false);
    setEmailError(false);
    setTextError(false);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError(!name.trim().length);
    setEmailError(!email.trim().length);
    setTextError(!text.trim().length);

    if (!name.trim().length || !email.trim().length || !text.trim().length) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      name,
      email,
      body: text,
      postId,
    };

    setIsSubmiting(true);

    createComment(newComment)
      .then(() => {
        loadComments(postId);
      })
      .finally(() => {
        setIsSubmiting(false);
      });

    reset();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmitHandler}
      onReset={reset}
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
            className={classNames('input', {
              'is-danger': !!nameError,
            })}
            value={name}
            onChange={changeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!!nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!nameError && (
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
            className={classNames('input', {
              'is-danger': !!emailError,
            })}
            value={email}
            onChange={changeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!!emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!emailError && (
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
            className={classNames('textarea', {
              'is-danger': !!textError,
            })}
            value={text}
            onChange={changeText}
          />
        </div>

        {!!textError && (
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
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
