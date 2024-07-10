import React, { ChangeEvent, memo, useContext, useState } from 'react';
import cn from 'classnames';
import { PostsContext } from '../store/PostsContext';

import { CommentsContext } from '../store/CommentsContext';

export const NewCommentForm = memo(function NewCommentFormComponent() {
  const { selectedPost } = useContext(PostsContext);
  const { text, setText, addComment, addLoading } = useContext(CommentsContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setbodyError] = useState(false);

  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    setValue: (value: string) => void,
    setValueError: (error: boolean) => void,
  ) => {
    setValue(event.target.value);
    setValueError(false);
  };

  const clear = () => {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setText('');
    setbodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nameNormalize = name.trim();
    const emailNormalize = email.trim();
    const textNormalize = text.trim();

    if (!nameNormalize) {
      setNameError(true);
    }

    if (!emailNormalize) {
      setEmailError(true);
    }

    if (!textNormalize) {
      setbodyError(true);
    }

    if (!nameNormalize || !emailNormalize || !textNormalize) {
      return;
    }

    addComment({
      id: 0,
      name: nameNormalize,
      email: emailNormalize,
      body: textNormalize,
      postId: selectedPost?.id || 0,
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
            className={cn('input', { 'is-danger': nameError })}
            value={name}
            onChange={event => handleNameChange(event, setName, setNameError)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={event => handleNameChange(event, setEmail, setEmailError)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            className={cn('textarea', { 'is-danger': bodyError })}
            value={text}
            onChange={event => handleNameChange(event, setText, setbodyError)}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': addLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
