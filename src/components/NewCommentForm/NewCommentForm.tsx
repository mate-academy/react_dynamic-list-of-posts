import {
  FC,
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import cn from 'classnames';

import { Comment, Post } from '../../types/';
import { addComment } from '../../services';

interface Props {
  postId: Post['id'];
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

export const NewCommentForm: FC<Props> = ({ postId, setComments }) => {
  const [nameQuery, setNameQuery] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [emailQuery, setEmailQuery] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [bodyQuery, setBodyQuery] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAddingError, setHasAddingError] = useState(false);

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasNameError(false);
    setNameQuery(event.target.value.trimStart());
  };

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);
    setEmailQuery(event.target.value.trimStart());
  };

  const handleBodyTextareaChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setHasBodyError(false);
    setBodyQuery(event.target.value.trimStart());
  };

  const handleClearForm = () => {
    setNameQuery('');
    setHasNameError(false);
    setEmailQuery('');
    setHasEmailError(false);
    setBodyQuery('');
    setHasBodyError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setHasAddingError(false);

    const trimmedNameQuery = nameQuery.trim();
    const trimmedEmailQuery = emailQuery.trim();
    const trimmedBodyQuery = bodyQuery.trim();

    setHasNameError(!trimmedNameQuery);
    setHasEmailError(!trimmedEmailQuery);
    setHasBodyError(!trimmedBodyQuery);

    if (!trimmedNameQuery || !trimmedEmailQuery || !trimmedBodyQuery) {
      setIsLoading(false);

      return;
    }

    addComment({
      postId: postId,
      name: trimmedNameQuery,
      email: trimmedEmailQuery,
      body: trimmedBodyQuery,
    })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        setBodyQuery('');
      })
      .catch(() => setHasAddingError(true))
      .finally(() => setIsLoading(false));
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
            value={nameQuery}
            onChange={handleNameInputChange}
            className={cn('input', {
              'is-danger': hasNameError,
            })}
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
            id="comment-author-email"
            placeholder="email@test.com"
            value={emailQuery}
            onChange={handleEmailInputChange}
            className={cn('input', {
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
            placeholder="Type comment here"
            value={bodyQuery}
            onChange={handleBodyTextareaChange}
            className={cn('textarea', {
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
            className={cn('button is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>

      {hasAddingError && (
        <div className="notification is-danger">Something went wrong!</div>
      )}
    </form>
  );
};
