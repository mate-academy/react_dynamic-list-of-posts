import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post
  commentsFromServer: () => void
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  commentsFromServer,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isNameDanger, setIsNameDanger] = useState(false);
  const [isEmailDanger, setIsEmailDanger] = useState(false);
  const [isTextDanger, setIsTextDanger] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const newCommentPost = async () => {
    await client.post('/comments', {
      postId: selectedPost.id,
      name,
      email,
      body: text,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name !== '' && email !== '' && text !== '') {
      newCommentPost();
      setIsLoadingComment(true);
    }

    switch (true) {
      case name.length === 0:
        setIsNameDanger(true);
        break;

      case email.length === 0:
        setIsEmailDanger(true);
        break;

      case text.length === 0:
        setIsTextDanger(true);
        break;

      default:
    }
  };

  const clearButtonHandler = () => {
    setText('');
    setEmail('');
    setName('');
    setIsNameDanger(false);
    setIsEmailDanger(false);
    setIsTextDanger(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadingComment(false);
      commentsFromServer();
      setText('');
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoadingComment]);

  useEffect(() => {
    if (name.length > 0) {
      setIsNameDanger(false);
    }

    if (email.length > 0) {
      setIsEmailDanger(false);
    }

    if (text.length > 0) {
      setIsTextDanger(false);
    }
  }, [name, email, text]);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={submitHandler}
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
              'is-danger': isNameDanger,
            })}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameDanger && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameDanger && (
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
              'is-danger': isEmailDanger,
            })}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailDanger && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailDanger && (
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
              'is-danger': isTextDanger,
            })}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        {isTextDanger && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div
          className="control"
        >
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoadingComment,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearButtonHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
