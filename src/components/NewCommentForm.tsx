import React, { useState } from 'react';
import cn from 'classnames';
import { addComment } from '../api/dataFromServer';
import { Comment } from '../types';

interface Props {
  postId: number;
  onChangeComment: (newComment: Comment) => void;
}

interface Fields {
  title: string;
  email: string;
  message: string;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onChangeComment,
}) => {
  const [fields, setFields] = useState<Fields>({
    title: '',
    email: '',
    message: '',
  });

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasMessageError, setHasMessageError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setFields(prevFields => ({ ...prevFields, message: '' }));
    setHasEmailError(false);
    setHasMessageError(false);
    setHasTitleError(false);
  };

  const changeFieldsState = (value: string, key: keyof Fields) => {
    setFields(prevFields => ({ ...prevFields, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, email, message } = fields;

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (!email.trim()) {
      setHasEmailError(true);
    }

    if (!message.trim()) {
      setHasMessageError(true);
    }

    if (title.trim() && message.trim() && email.trim()) {
      setIsLoading(true);
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
        setIsLoading(false);
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
            className={cn('input', { 'is-danger': hasTitleError })}
            value={fields.title}
            onChange={e => changeFieldsState(e.target.value, 'title')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasTitleError && (
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
            className={cn('input', { 'is-danger': hasEmailError })}
            value={fields.email}
            onChange={e => changeFieldsState(e.target.value, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
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
            className={cn('textarea', { 'is-danger': hasMessageError })}
            value={fields.message}
            onChange={e => changeFieldsState(e.target.value, 'message')}
          />
        </div>

        {hasMessageError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
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
