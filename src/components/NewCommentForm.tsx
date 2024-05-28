import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Comment } from '../types/Comment';
import { AppContext } from '../context/AppContext';
import { addPostComment } from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { selectedPost } = state;
  const { post } = selectedPost;

  // #region authorName
  const [authorName, setAuthorName] = useState('');
  const handleAuthorName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
  };
  // #endregion

  // #region authorEmail
  const [authorEmail, setAuthorEmail] = useState('');
  const handleAuthorEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(event.target.value);
  };
  // #endregion

  // #region authorComment
  const [authorComment, setAuthorComment] = useState('');
  const handleAuthorComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAuthorComment(event.target.value);
  };
  // #endregion

  // #region formErrors
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  // #endregion

  // #region formSubmit
  const [formSubmitting, setFormSubmitting] = useState(false);
  const clear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setAuthorComment('');

    setNameError(false);
    setEmailError(false);
    setCommentError(false);
  };

  const validate = (name: string, email: string, commentBody: string) => {
    const errors = {
      nameError: false,
      emailError: false,
      commentBodyError: false,
    };

    if (!name) {
      setNameError(true);

      errors.nameError = true;
    }

    if (!email) {
      setEmailError(true);

      errors.emailError = true;
    }

    if (!commentBody) {
      setCommentError(true);

      errors.commentBodyError = true;
    }

    return errors;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorFormCheck = validate(authorName, authorEmail, authorComment);

    if (
      errorFormCheck.commentBodyError ||
      errorFormCheck.emailError ||
      errorFormCheck.nameError
    ) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId: post ? post.id : Math.random(),
      name: authorName,
      email: authorEmail,
      body: authorComment,
    };

    setFormSubmitting(true);

    try {
      const response = await addPostComment(newComment);

      dispatch({
        type: 'LOAD_POST_COMMENTS',
        payload: [...state.postComments.comments, response],
      });

      setAuthorComment('');
    } catch (error) {
      setAuthorName(newComment.name);
      setAuthorEmail(newComment.email);
      setAuthorComment(newComment.body);
    } finally {
      setFormSubmitting(false);
    }
  };
  // #endregion

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              'is-danger': nameError,
            })}
            value={authorName}
            onChange={event => {
              handleAuthorName(event);
              setNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
              'is-danger': emailError,
            })}
            value={authorEmail}
            onChange={event => {
              handleAuthorEmail(event);
              setEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
              'is-danger': commentError,
            })}
            value={authorComment}
            onChange={event => {
              handleAuthorComment(event);
              setCommentError(false);
            }}
          />
        </div>

        {commentError && (
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
              'is-loading': formSubmitting,
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
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
