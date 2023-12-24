import cn from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';
import { Form } from '../../types/Form';
import { validateForm } from './helper';

interface Props {
  selectedPost: Post | null;
  setCommentsOfPost: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  setIsErrorShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EMPTY_FORM: Form<string> = {
  author: '',
  email: '',
  text: '',
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setCommentsOfPost,
  setIsErrorShowing,
}) => {
  const [formInputs, setFormInputs] = useState<Form<string>>({
    ...EMPTY_FORM,
  });
  const [formErrors, setFormErrors] = useState({
    author: false,
    email: false,
    text: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeInput = (value: string, field: string): void => {
    setFormInputs(prevForm => ({
      ...prevForm,
      [field]: value,
    }));

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleReset = () => {
    setFormInputs({
      ...EMPTY_FORM,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsErrorShowing(false);

    if (!validateForm(formInputs, setFormErrors)) {
      return;
    }

    const newComment = {
      postId: selectedPost?.id,
      name: formInputs.author,
      email: formInputs.email,
      body: formInputs.text,
    };

    setIsSubmitting(true);
    client
      .post<Comment>('/comments', newComment)
      .then(comment => {
        setCommentsOfPost(prevComments => {
          if (prevComments) {
            return [...prevComments, comment];
          }

          return null;
        });

        setFormInputs(prevValues => ({
          ...prevValues,
          text: '',
        }));
      })
      .catch(() => setIsErrorShowing(true))
      .finally(() => setIsSubmitting(false));
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
            className={cn('input', { 'is-danger': formErrors.author })}
            value={formInputs.author}
            onChange={event => handleChangeInput(event.target.value, 'author')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.author && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.author && (
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
            className={cn('input', { 'is-danger': formErrors.email })}
            value={formInputs.email}
            onChange={event => handleChangeInput(event.target.value, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
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
            className={cn('textarea', { 'is-danger': formErrors.text })}
            value={formInputs.text}
            onChange={event => handleChangeInput(event.target.value, 'text')}
          />
        </div>

        {formErrors.text && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmitting })}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
