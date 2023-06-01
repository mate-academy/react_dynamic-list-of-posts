import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

const formDefaultValue: CommentData = {
  name: '',
  email: '',
  body: '',
};

interface Props {
  postId: number;
  postCommentError: () => void;
  showNewComment: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  postCommentError,
  showNewComment,
}) => {
  const [formValue, setFormValue] = useState<CommentData>(formDefaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    emptyName: true,
    emptyEmail: true,
    emptyBody: true,
  });
  const [addButtonClicked, setAddButtonClicked] = useState(false);

  const { name, email, body } = useMemo(() => formValue, [formValue]);
  const { emptyName, emptyEmail, emptyBody } = useMemo(() => errors, [errors]);

  useEffect(() => {
    if (name === formDefaultValue.name) {
      setErrors((prevState) => ({ ...prevState, emptyName: true }));
    } else {
      setErrors((prevState) => ({ ...prevState, emptyName: false }));
    }
  }, [name, formDefaultValue.name]);

  useEffect(() => {
    if (email === formDefaultValue.email) {
      setErrors((prevState) => ({ ...prevState, emptyEmail: true }));
    } else {
      setErrors((prevState) => ({ ...prevState, emptyEmail: false }));
    }
  }, [email, formDefaultValue.name]);

  useEffect(() => {
    if (body === formDefaultValue.body) {
      setErrors((prevState) => ({ ...prevState, emptyBody: true }));
    } else {
      setErrors((prevState) => ({ ...prevState, emptyBody: false }));
    }
  }, [body, formDefaultValue.body]);

  const handleInputChange = useCallback(
    (
      event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
      propertyName: keyof CommentData,
    ) => {
      setFormValue((prevState) => ({
        ...prevState,
        [propertyName]: event.target.value,
      }));

      if (addButtonClicked) {
        setAddButtonClicked(false);
      }
    },
    [formValue, addButtonClicked],
  );

  const handleClearButtonClick = useCallback(() => {
    setFormValue(formDefaultValue);
    setAddButtonClicked(false);
  }, []);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (Object.values(errors).some(error => error)) {
        setAddButtonClicked(true);

        return;
      }

      const addComment = async () => {
        try {
          setIsLoading(true);

          const comment = {
            ...formValue,
            postId,
          };

          const newComment = await client.post<Comment>('/comments', comment);

          showNewComment(newComment);

          setFormValue((prevState) => ({ ...prevState, body: '' }));
        } catch {
          postCommentError();
        } finally {
          setIsLoading(false);
        }
      };

      addComment();
    },
    [formValue, errors],
  );

  const showEmptyNameError = useMemo(
    () => emptyName && addButtonClicked,
    [emptyName, addButtonClicked],
  );
  const showEmptyEmailError = useMemo(
    () => emptyEmail && addButtonClicked,
    [emptyEmail, addButtonClicked],
  );
  const showEmptyBodyError = useMemo(
    () => emptyBody && addButtonClicked,
    [emptyBody, addButtonClicked],
  );

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handleFormSubmit(event)}
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
            className={classNames('input', { 'is-danger': showEmptyNameError })}
            value={name}
            onChange={(event) => handleInputChange(event, 'name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {showEmptyNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {showEmptyNameError && (
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
              'is-danger': showEmptyEmailError,
            })}
            value={email}
            onChange={(event) => handleInputChange(event, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {showEmptyEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {showEmptyEmailError && (
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
            className={classNames('input', { 'is-danger': showEmptyBodyError })}
            value={body}
            onChange={(event) => handleInputChange(event, 'body')}
          />
        </div>

        {showEmptyBodyError && (
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButtonClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
