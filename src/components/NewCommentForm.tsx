import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import * as FunctionCalls from '../api/functionServerRequests';

type Props = {
  setAllComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  postId: number;
  allComments: Comment[] | null;
};

export const NewCommentForm: React.FC<Props> = ({
  setAllComments,
  postId,
  allComments,
}) => {
  // input name
  const [name, setName] = useState('');
  const [shoowErrorName, setShoowErrorName] = useState(false);

  // input Email
  const [email, setEmail] = useState('');
  const [shoowErrorEmail, setShoowErrorEmail] = useState(false);

  // input Text
  const [text, setText] = useState('');
  const [shoowErrorText, setShoowErrorText] = useState(false);

  const [shoowLoadingSubmit, setShoowLoadingSubmit] = useState(false);

  function clearInput() {
    setName('');
    setShoowErrorName(false);
    setEmail('');
    setShoowErrorText(false);
    setText('');
    setShoowErrorEmail(false);
  }

  function detectionName() {
    if (name === '') {
      setShoowErrorName(true);

      return false;
    }

    return true;
  }

  function detectionEmail() {
    if (email === '') {
      setShoowErrorEmail(true);

      return false;
    }

    return true;
  }

  function detectionText() {
    if (text === '') {
      setShoowErrorText(true);

      return false;
    }

    return true;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    detectionName();
    detectionEmail();
    detectionText();

    if (detectionName() && detectionEmail() && detectionText()) {
      const maxId = allComments
        ? Math.max(...allComments.map(com => com.id))
        : 0;
      const newComment = {
        id: maxId + 1,
        postId: postId,
        name: name,
        email: email,
        body: text,
      };

      setShoowLoadingSubmit(true);
      FunctionCalls.addComment(newComment)
        .then(() => {
          setAllComments(current =>
            current ? [...current, newComment] : [newComment],
          );
        })
        .finally(() => {
          setText('');
          setShoowErrorEmail(false);
          setShoowLoadingSubmit(false);
        });
    }
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={e => onSubmit(e)}>
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
              'is-danger': shoowErrorName,
            })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setShoowErrorName(false);
            }}
            onBlur={() => detectionName()}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {shoowErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {shoowErrorName && (
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
              'is-danger': shoowErrorEmail,
            })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setShoowErrorEmail(false);
            }}
            onBlur={() => detectionEmail()}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {shoowErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {shoowErrorEmail && (
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
              'is-danger': shoowErrorText,
            })}
            value={text}
            onChange={e => {
              setText(e.target.value);
              setShoowErrorText(false);
            }}
            onBlur={() => detectionText()}
          />
        </div>

        {shoowErrorText && (
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
              'is-loading': shoowLoadingSubmit,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => clearInput()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
