import React, { useState } from 'react';
import { Comment, CommentProps } from '../types/Comment';
import { createComment } from '../Api/Api';
import classNames from 'classnames';

export const NewCommentForm: React.FC<CommentProps> = ({
  setComments,
  postId,
  setErrorMessage,
}) => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userText, setUserText] = useState<string>('');
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isText, setIsText] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetText = () => {
    setUserText('');
  };

  const resetAll = () => {
    setUserName('');
    setUserEmail('');
    setUserText('');
  };

  const handleIsName = (isN: boolean) => {
    setIsName(isN);
  };

  const handleIsEmail = (emA: boolean) => {
    setIsEmail(emA);
  };

  const handleIsText = (texT: boolean) => {
    setIsText(texT);
  };

  const addComment = ({
    postId: id,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    setIsLoading(true);
    createComment({ postId: id, name, email, body })
      .then(commentsVindoDaApi =>
        setComments(currentComments => [
          ...currentComments,
          commentsVindoDaApi,
        ]),
      )

      .catch(() => setErrorMessage('Error adding comment'))
      .finally(() => {
        resetText();
        handleIsName(false);
        handleIsEmail(false);
        handleIsText(false);
        setIsLoading(false);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      userName.trim().length === 0 ||
      userText.trim().length === 0 ||
      userEmail.trim().length === 0
    ) {
      handleIsName(true);
      handleIsEmail(true);
      handleIsText(true);

      return;
    }

    return addComment({
      postId: postId,
      name: userName.trim(),
      email: userEmail.trim(),
      body: userText.trim(),
    });
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(event.target.value);
  };

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
            className={classNames('input', {
              'is-danger': isName && userName.length === 0,
            })}
            value={userName}
            onChange={event => {
              handleName(event);
              handleIsName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isName && userName.length === 0 && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isName && userName.length === 0 && (
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
              'is-danger': isEmail && userEmail.length === 0,
            })}
            onChange={event => {
              handleEmail(event);
              handleIsEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmail && userEmail.length === 0 && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmail && userEmail.length === 0 && (
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
              'is-danger': isText && userText.length === 0,
            })}
            value={userText}
            onChange={event => {
              handleBody(event);
              handleIsText(false);
            }}
          />
        </div>

        {isText && userText.length === 0 && (
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
              'is-loading': isLoading,
            })}
            onClick={event => {
              handleSubmit(event);
            }}
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
              resetAll();
              handleIsEmail(false);
              handleIsName(false);
              handleIsText(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
