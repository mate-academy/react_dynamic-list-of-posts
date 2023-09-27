import React, {
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import { StateContext } from './AppContext';
import { addComment, getComments } from '../utils/loadutil';
import { ACTIONS } from '../utils/enums';

export const NewCommentForm: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const initialComment = {
    name: '',
    body: '',
    email: '',
    postId: state.selectedPost.id,
  };

  const [newComment, setNewComment] = useState(initialComment);
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCommentTextError, setIsCommentTextError] = useState(false);

  function hanldeInputName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!e.target.value.split('').every(element => element === ' ')) {
      setNewComment({
        ...newComment,
        name: e.currentTarget.value,
      });
      setIsNameError(false);
    }
  }

  function hanldeInputEmail(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setNewComment({
      ...newComment,
      email: e.currentTarget.value,
    });
    setIsEmailError(false);
  }

  function hanldeInputCommentText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setNewComment({
      ...newComment,
      body: e.currentTarget.value,
    });
    setIsCommentTextError(false);
  }

  function handleClear() {
    setNewComment(initialComment);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (newComment.body.length === 0) {
      setIsCommentTextError(true);
    }

    if (newComment.name.length === 0) {
      setIsNameError(true);
    }

    if (newComment.email.length === 0) {
      setIsEmailError(true);
    }

    if ((newComment.body.length === 0)
      || (newComment.name.length === 0)
      || (newComment.email.length === 0)
    ) {
      return;
    }

    dispatch({ type: ACTIONS.IS_LOADING, payload: true });
    addComment(newComment)
      .then((res) => {
        if ('error' in res) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: 'error' });
        }

        getComments(state.selectedPost.id)
          .then(resp => {
            dispatch({ type: ACTIONS.SET_COMMENTS, payload: resp });
          });
      })
      .finally(() => dispatch({ type: ACTIONS.IS_LOADING, payload: false }));
    setNewComment({
      ...newComment,
      body: '',
    });
  }

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
            value={newComment.name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': isNameError,
            })}
            onChange={(e) => hanldeInputName(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
              'is-danger': isEmailError,
            })}
            onChange={(e) => hanldeInputEmail(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
              'is-danger': isCommentTextError,
            })}
            value={newComment.body}
            onChange={(e) => hanldeInputCommentText(e)}
          />
        </div>

        {isCommentTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link "
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
