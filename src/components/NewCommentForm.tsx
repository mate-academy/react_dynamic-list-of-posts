import React, { useContext, useState } from 'react';
import { CommentContext } from '../context/CommentProvider';
import { PostContext } from '../context/PostProvider';
import cn from 'classnames';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);

  const { selectedPost } = useContext(PostContext);
  const { addComment, isLoading } = useContext(CommentContext);

  const addCommentHandle = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();

    if (!trimmedName) {
      setNameError(true);
    }

    if (!trimmedEmail) {
      setEmailError(true);
    }

    if (!trimmedText) {
      setTextError(true);
    }

    if (!selectedPost || !trimmedName || !trimmedEmail || !trimmedText) {
      return;
    }

    const newComment = {
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedText,
      postId: selectedPost.id,
    };

    addComment(newComment);

    setText('');
  };

  const clearInputsHandle = () => {
    setName('');
    setEmail('');
    setText('');
    setNameError(false);
    setEmailError(false);
    setTextError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addCommentHandle}>
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
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isSubmitted && nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isSubmitted && nameError && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isSubmitted && emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isSubmitted && emailError && (
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
            className={cn('textarea', { 'is-danger': textError })}
            value={text}
            onChange={e => {
              setText(e.target.value);
              setTextError(false);
            }}
          />
        </div>

        {isSubmitted && textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearInputsHandle}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
