import React, { useState } from 'react';
import cn from 'classnames';
import { addComment } from '../api/dataFromServer';
import { Comment } from '../types';

interface Props {
  postId: number;
  onChangeComment: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onChangeComment,
}) => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [loading, setLoading] = useState(false);

  const reset = () => {
    setMessage('');
    setEmailError(false);
    setMessageError(false);
    setTitleError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!email.trim()) {
      setEmailError(true);
    }

    if (!message.trim()) {
      setMessageError(true);
    }

    if (title.trim() && message.trim() && email.trim()) {
      setLoading(true);
      try {
        const newComment = await addComment({
          postId,
          name: title,
          email,
          body: message,
        });

        onChangeComment(newComment);
        reset();
      } finally {
        setLoading(false);
      }
    }
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
            autoFocus
            className={cn('input', { 'is-danger': titleError })}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          {!titleError ? (
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          ) : (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
            onChange={e => setEmail(e.target.value)}
          />

          {!emailError ? (
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          ) : (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
            className={cn('textarea', { 'is-danger': messageError })}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        {messageError && (
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
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
