import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  addComment: (
    name: string,
    email: string,
    body: string,
    setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentTextError, setCommentTextError] = useState(false);

  const hasError = !author || !email || !commentText;

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (hasError) {
          setAuthorError(author === '');
          setEmailError(email === '');
          setCommentTextError(commentText === '');

          return;
        }

        addComment(author, email, commentText, setSpinner);
        setCommentText('');
      }}
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
              'input is-danger': authorError,
            })}
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
              setAuthorError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {authorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorError && (
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
              'input is-danger': emailError,
            })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
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
            className={classNames('textarea', {
              'textarea is-danger': commentTextError,
            })}
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
              setCommentTextError(false);
            }}
          />
        </div>

        {commentTextError && (
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
              'button is-link', {
                'button is-link is-loading': spinner,
              },
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
            onClick={() => {
              setAuthor('');
              setEmail('');
              setCommentText('');
              setAuthorError(false);
              setEmailError(false);
              setCommentTextError(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
