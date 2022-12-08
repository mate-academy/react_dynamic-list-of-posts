import classNames from 'classnames';
import React, { useState } from 'react';
import { postComment } from '../utils/requests';

// type Props = {
//   setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
// };

// eslint-disable-next-line no-empty-pattern
export const NewCommentForm: React.FC = (/* { setComments } */) => {
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputCommentValue, setInputCommentValue] = useState('');
  const [isOnSubmitLoading, setIsOnSubmitLoading] = useState(false);

  const newComment = {
    id: +new Date(2023),
    postId: +new Date(9999),
    name: inputNameValue,
    email: inputEmailValue,
    body: inputCommentValue,
  };

  const handleResetForm = () => {
    setInputNameValue('');
    setInputEmailValue('');
    setInputCommentValue('');
  };

  const checkIsEmpty = (a: string, b: string, c: string) => {
    return a && b && c;
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkIsEmpty(inputNameValue, inputEmailValue, inputCommentValue)) {
      setIsOnSubmitLoading(true);
      // eslint-disable-next-line no-console
      console.log('in if');

      try {
        await postComment(newComment);
        // setComments((prev: Comment[]): Comment[] => [...prev, newComment])

        setIsOnSubmitLoading(false);
      } catch {
        setIsOnSubmitLoading(false);
      } finally {
        setIsOnSubmitLoading(false);
      }
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleOnSubmit}
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
            className="input is-danger"
            value={inputNameValue}
            onChange={event => setInputNameValue(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
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
            className="input is-danger"
            value={inputEmailValue}
            onChange={event => setInputEmailValue(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
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
            className="textarea is-danger"
            value={inputCommentValue}
            onChange={event => setInputCommentValue(event.target.value)}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isOnSubmitLoading },
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
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
