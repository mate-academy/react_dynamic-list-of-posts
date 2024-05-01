import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../api/addComment';
import { Post } from '../types/Post';
import { getComments } from '../api/getComments';
import { CommentContext } from '../utils/CommentsContext';

const noErrors = {
  nameError: false,
  emailError: false,
  textError: false,
};

type Props = {
  openedPost: Post;
};

export const NewCommentForm: React.FC<Props> = ({ openedPost }) => {
  const [errors, setErrors] = useState(noErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const { setComments } = useContext(CommentContext);

  const handleReset = () => {
    setEmailValue('');
    setNameValue('');
    setTextValue('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nameValue.trim()) {
      setErrors(prev => ({ ...prev, nameError: true }));
    }

    if (!emailValue.trim()) {
      setErrors(prev => ({ ...prev, emailError: true }));
    }

    if (!textValue.trim()) {
      setErrors(prev => ({ ...prev, textError: true }));
    }

    if (
      nameValue.trim() &&
      emailValue.trim() &&
      textValue.trim() &&
      openedPost
    ) {
      const data = {
        postId: openedPost.id,
        name: nameValue,
        email: emailValue,
        body: textValue,
      };

      setIsLoading(true);
      setTimeout(() => {
        addComment(data)
          .catch(() => {})
          .finally(() => {
            setIsLoading(false);
            getComments(openedPost.id)
              .then(result => setComments(result))
              .finally(() => setTextValue(''));
          });
      }, 300);
    }
  };

  return (
    <form
      onReset={handleReset}
      onSubmit={handleSubmit}
      data-cy="NewCommentForm"
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={nameValue}
            onChange={event => {
              setNameValue(event.target.value);
              setErrors(prev => ({ ...prev, nameError: false }));
            }}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.nameError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.nameError && (
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
            value={emailValue}
            onChange={event => {
              setEmailValue(event.target.value);
              setErrors(prev => ({ ...prev, emailError: false }));
            }}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.emailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.emailError && (
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
            value={textValue}
            onChange={event => {
              setTextValue(event.target.value);
              setErrors(prev => ({ ...prev, textError: false }));
            }}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('input', { 'is-danger': errors.textError })}
          />
        </div>
        {errors.textError && (
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
