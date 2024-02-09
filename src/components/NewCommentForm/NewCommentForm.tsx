import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { MainContext } from '../MainContext/MainContext';
import { createComments } from '../../api/comments';
import { Errors } from '../../types/Errors';
import { Field } from '../../types/Field';

const initialErrorFields = {
  name: false,
  email: false,
  body: false,
};

const initialCommentState = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC = () => {
  const {
    chosenPost,
    comments,
    setComments,
    setError,
  } = useContext(MainContext);

  const [comment, setComment] = useState(initialCommentState);
  const [errorFields, setErrorFields] = useState(initialErrorFields);
  const [isLoadingAddButton, setIsLoadingAddButton] = useState(false);

  function commentChangeFields(key: Field, value: string) {
    setComment(prevComment => ({ ...prevComment, [key]: value }));
  }

  function handleErrorFields(key: Field, value: boolean) {
    setErrorFields(prevErrorFields => ({ ...prevErrorFields, [key]: value }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingAddButton(true);

    const { name, email, body } = comment;

    if (!name) {
      setIsLoadingAddButton(false);
      handleErrorFields(Field.NAME, true);
    }

    if (!email) {
      setIsLoadingAddButton(false);
      handleErrorFields(Field.EMAIL, true);
    }

    if (!body) {
      setIsLoadingAddButton(false);
      handleErrorFields(Field.BODY, true);
    }

    if (chosenPost && name && email && body) {
      const newComment = {
        postId: chosenPost.id,
        name,
        email,
        body,
      };

      createComments(newComment)
        .then((createdComment) => {
          if (comments) {
            setComments([...comments, createdComment]);
          }

          commentChangeFields(Field.BODY, '');
        })
        .catch(() => setError(Errors.COMMENT))
        .finally(() => setIsLoadingAddButton(false));
    }
  };

  const handleReset = () => {
    setComment(initialCommentState);
    setErrorFields(initialErrorFields);
  };

  function nameChangeField(value: string) {
    commentChangeFields(Field.NAME, value);
    handleErrorFields(Field.NAME, false);
  }

  function emailChangeField(value: string) {
    commentChangeFields(Field.EMAIL, value);
    handleErrorFields(Field.EMAIL, false);
  }

  function bodyChangeField(value: string) {
    commentChangeFields(Field.BODY, value);
    handleErrorFields(Field.BODY, false);
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e) => handleSubmit(e)}
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
            className={cn('input', {
              'is-danger': !comment.name.length && errorFields.name,
            })}
            value={comment.name}
            onChange={(e) => nameChangeField(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!comment.name && errorFields.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!comment.name && errorFields.name && (
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
            className={cn('input', {
              'is-danger': !comment.email.length && errorFields.email,
            })}
            value={comment.email}
            onChange={(e) => emailChangeField(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!comment.email && errorFields.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!comment.email && errorFields.email && (
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
            className={cn('textarea', {
              'is-danger': !comment.body.length && errorFields.body,
            })}
            value={comment.body}
            onChange={(e) => bodyChangeField(e.target.value)}
          />
        </div>

        {!comment.body && errorFields.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': isLoadingAddButton,
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
