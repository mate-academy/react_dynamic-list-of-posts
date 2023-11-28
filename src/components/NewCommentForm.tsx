import React, { useCallback } from 'react';
import cn from 'classnames';
import { createComment } from '../api/PostsApi';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const emptyInputs: CommentData = {
  name: '',
  email: '',
  body: '',
};

const emptyErrors = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setError,
}) => {
  const [data, setData] = React.useState<CommentData>(emptyInputs);
  const [errors, setErrors] = React.useState(emptyErrors);
  const [isLoading, setIsLoading] = React.useState(false);

  const resetForm = useCallback(() => {
    setError(false);

    setData(emptyInputs);
    setErrors(emptyErrors);
  }, [setError]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);

    if (!data.name || !data.email || !data.body) {
      setErrors({
        name: !data.name,
        email: !data.email,
        body: !data.body,
      });

      return;
    }

    setIsLoading(true);
    createComment({ ...data, postId })
      .then((comment) => {
        setComments((prevComments) => [...prevComments, comment]);
        setData(prevData => ({ ...prevData, body: '' }));
      })
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onInputFocused = useCallback((field: keyof CommentData) => {
    setErrors((prevErrors) => (
      { ...prevErrors, [field]: false }
    ));
  }, []);

  const onInputChanged = useCallback((
    field: keyof CommentData,
    value: string,
  ) => {
    setData((prevData) => (
      { ...prevData, [field]: value.trimStart() }
    ));
  }, []);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            value={data.name}
            onChange={(event) => onInputChanged('name', event.target.value)}
            onFocus={() => onInputFocused('name')}
            className={cn('input', { 'is-danger': errors.name })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            value={data.email}
            className={cn('input', { 'is-danger': errors.email })}
            onChange={(event) => onInputChanged('email', event.target.value)}
            onFocus={() => onInputFocused('email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            value={data.body}
            className={cn('input', 'comm-area', { 'is-danger': errors.body })}
            onChange={(event) => onInputChanged('body', event.target.value)}
            onFocus={() => onInputFocused('body')}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-link',
              { 'is-loading': isLoading },
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
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
