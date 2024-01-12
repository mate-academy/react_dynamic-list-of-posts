import classNames from 'classnames';
import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { createComment } from '../api/comments';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  isNewComment: boolean,
  postForComment: Post,
  setComment: React.Dispatch<React.SetStateAction<Comment[]>>
};

export const NewCommentForm: React.FC<Props> = ({
  isNewComment,
  postForComment,
  setComment,
}) => {
  const [commentName, setCommentName] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);
  const [hasLoaderButton, setHasLoaderButton] = useState(false);
  const inputName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputName.current) {
      inputName.current.focus();
    }
  }, [isNewComment]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    setHasBodyError(!bodyValue);
    setHasEmailError(!emailValue);
    setHasNameError(!commentName);

    if (!commentName || !emailValue || !bodyValue) {
      return;
    }

    setHasLoaderButton(true);

    createComment({
      postId: postForComment.id,
      name: commentName,
      email: emailValue,
      body: bodyValue,
    })
      .then((data) => {
        setComment((prevValue) => [...prevValue, data]);
      })
      .finally(() => {
        setBodyValue('');
        setHasLoaderButton(false);
      });
  };

  const sendName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentName(e.target.value);
    setHasNameError(false);
  };

  const sendEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setHasEmailError(false);
  };

  const sendBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyValue(e.target.value);
    setHasBodyError(false);
  };

  const clearForm = () => {
    setBodyValue('');
    setEmailValue('');
    setCommentName('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            ref={inputName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input ', {
              'is-danger': hasNameError,
            })}
            value={commentName}
            onChange={sendName}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasNameError && (
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
            value={emailValue}
            onChange={sendEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input ', {
              'is-danger': hasEmailError,
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasEmailError && (
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
            value={bodyValue}
            onChange={sendBody}
            placeholder="Type comment here"
            className={classNames('textarea ', {
              'is-danger': hasBodyError,
            })}
          />
        </div>
        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link ', {
              'is-loading': hasLoaderButton,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={clearForm}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
