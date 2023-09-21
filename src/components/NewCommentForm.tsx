import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../api/api';
import { CommentData } from '../types/Comment';
import { CommentsContext } from './CommentsContext';
import { ModalPostContext } from './ModalPostContext';

const DEFAULT_FIELDS: CommentData = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC = () => {
  const [formFields, setFormFields] = useState<CommentData>(DEFAULT_FIELDS);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { comments, setComments } = useContext(CommentsContext);
  const { modalPost } = useContext(ModalPostContext);

  const errorCondition = (key: keyof CommentData) => {
    return isError && !formFields[key];
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formFields.name || !formFields.email || !formFields.body) {
      setIsError(true);

      return;
    }

    setIsLoading(true);
    try {
      const newPost = await addComment({
        postId: modalPost?.id,
        name: formFields.name,
        email: formFields.email,
        body: formFields.body,
      });

      setComments([...comments, newPost]);
      setFormFields(prevState => ({ ...prevState, body: '' }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);
    setFormFields(DEFAULT_FIELDS);
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof CommentData,
  ) => {
    setFormFields(prevState => ({ ...prevState, [key]: event.target.value }));
  };

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
            className={classNames('input', {
              'is-danger': errorCondition('name'),
            })}
            value={formFields.name}
            onChange={event => handleFieldChange(event, 'name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorCondition('name') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorCondition('name') && (
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
              'is-danger': errorCondition('email'),
            })}
            value={formFields.email}
            onChange={event => handleFieldChange(event, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorCondition('email') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorCondition('email') && (
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
              'is-danger': errorCondition('body'),
            })}
            value={formFields.body}
            onChange={event => handleFieldChange(event, 'body')}
          />
        </div>

        {errorCondition('body') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

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
