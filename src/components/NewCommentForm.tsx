import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  postId?: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId = 0,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [commentTextError, setCommentTextError] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError(true);
    }

    if (!email.trim()) {
      setEmailError(true);
    }

    if (!commentText.trim()) {
      setCommentTextError(true);
    }

    if (!name.trim() || !email.trim() || !commentText.trim()) {
      return;
    }

    if (!nameError && !emailError && !commentTextError && !!postId) {
      setUpdating(true);

      const newComment: CommentData = {
        postId,
        name,
        email,
        body: commentText,
      };

      client
        .post('/comments', newComment)
        .then(data => {
          setComments(prev => [...prev, data as Comment]);
          setCommentText('');
        })
        .catch(() => {
          throw Error('Something went wrong!');
        })
        .finally(() => setUpdating(false));
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentTextError(false);
    setCommentText(e.target.value);
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCommentText('');
    setNameError(false);
    setEmailError(false);
    setCommentTextError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => handleSubmitForm(e)}
      onReset={() => handleClear()}
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
              'is-danger': nameError,
            })}
            value={name}
            onChange={handleName}
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={handleEmail}
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
              'is-danger': commentTextError,
            })}
            value={commentText}
            onChange={handleCommentText}
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
            className={classNames('button is-link', {
              'is-loading': updating,
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
