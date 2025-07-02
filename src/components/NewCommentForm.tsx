import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type NewCommentFormProps = {
  createComment: (comment: Omit<Comment, 'id'>) => void;
  isLoadingNewComment: boolean;
  openedPost: Post | null;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  createComment,
  isLoadingNewComment,
  openedPost,
}) => {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    bodyText: false,
  });

  function clear() {
    setNames('');
    setEmail('');
    setBodyText('');
    setErrors({
      name: false,
      email: false,
      bodyText: false,
    });
  }

  function clearAfterSubmit() {
    setBodyText('');
    setErrors({
      name: false,
      email: false,
      bodyText: false,
    });
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => {
        e.preventDefault();

        const newErrors = {
          name: names.trim() === '',
          email: email.trim() === '',
          bodyText: bodyText.trim() === '',
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some(Boolean);

        if (hasError) {
          return;
        }

        if (openedPost === null) {
          return;
        }

        const newComment = {
          postId: openedPost.id,
          name: names,
          email: email,
          body: bodyText,
        };

        createComment(newComment);

        clearAfterSubmit();
      }}
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
            className={errors.name ? 'input is-danger' : 'input'}
            value={names}
            onChange={e => {
              setNames(e.target.value);
              setErrors(prev => ({ ...prev, name: false }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
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
            className={errors.email ? 'input is-danger' : 'input'}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: false }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
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
            className={errors.bodyText ? 'textarea is-danger' : 'textarea'}
            value={bodyText}
            onChange={e => {
              setBodyText(e.target.value);
              setErrors(prev => ({ ...prev, bodyText: false }));
            }}
          />
        </div>

        {errors.bodyText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              isLoadingNewComment
                ? 'button is-link is-loading'
                : 'button is-link'
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              clear();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
