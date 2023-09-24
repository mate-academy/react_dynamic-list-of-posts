import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { createComment } from '../api/comments';
import { PostsContext } from '../context/PostsContext';
import { CommentsContext } from '../context/CommentsContext';
import { Comment } from '../types/Comment';

const defaultFormData = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC = () => {
  const { post } = useContext(PostsContext);
  const { setComments } = useContext(CommentsContext);

  const [formData, setFormData] = useState(defaultFormData);
  const [hasErrorForm, setHasErrorForm] = useState(false);

  const handleChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();

    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasErrorForm(true);

    if (!formData.email || !formData.body || !formData.name) {
      setHasErrorForm(true);

      return;
    }

    if (post) {
      const newComment = {
        id: +new Date(),
        name: formData.name,
        email: formData.email,
        body: formData.body,
        postId: post?.id,
      };

      createComment(newComment)
        .then(() => {
          setComments((prev: Comment[]) => [...prev, newComment]);
        })
        .catch((error) => error.json());
    }

    setHasErrorForm(false);
  };

  const handleReset = () => {
    setFormData(defaultFormData);
  };

  const hasEmailError = !formData.email.trim() && hasErrorForm;
  const hasNameError = !formData.name.trim() && hasErrorForm;
  const hasBodyError = !formData.body.trim() && hasErrorForm;

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={classnames('input', {
              'is-danger': hasNameError,
            })}
            value={formData.name}
            onChange={handleChangeForm}
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
            className={classnames('input', {
              'is-danger': hasEmailError,
            })}
            value={formData.email}
            onChange={handleChangeForm}
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
            className={classnames('textarea', {
              'is-danger': hasBodyError,
            })}
            value={formData.body}
            onChange={handleChangeForm}
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
          <button type="submit" className="button is-link ">
            Add
          </button>
        </div>
        {/* is-loading */}

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
