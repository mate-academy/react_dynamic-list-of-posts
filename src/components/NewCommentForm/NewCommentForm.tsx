import React, { useState } from 'react';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPost: Post | null;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};
const initialFormState = {
  name: '',
  email: '',
  body: '',
  hasErrorName: false,
  hasErrorEmail: false,
  hasErrorBody: false,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
}) => {
  // const [queryName, setQueryName] = useState('');
  // const [hasErrorName, setHasErrorName] = useState(false);
  // const [queryEmail, setQueryEmail] = useState('');
  // const [hasErrorEmail, setHasErrorEmail] = useState(false);
  // const [queryComText, setQueryComText] = useState('');
  // const [hasErrorComText, setHasErrorComText] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      name: event.target.value,
      hasErrorName: false,
    }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      email: event.target.value,
      hasErrorEmail: false,
    }));
  };

  const handleChangeComText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setForm(prev => ({
      ...prev,
      body: event.target.value,
      hasErrorBody: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPost) {
      return;
    }

    const nameError = form.name.trim() === '';
    const emailError = form.email.trim() === '';
    const bodyError = form.body.trim() === '';

    setForm(prev => ({
      ...prev,
      hasErrorName: nameError,
      hasErrorEmail: emailError,
      hasErrorBody: bodyError,
    }));

    if (nameError || emailError || bodyError) {
      return;
    }

    setIsSubmitting(true);
    setHasSubmitError(false);

    const newComment: Omit<Comment, 'id'> = {
      postId: selectedPost.id,
      name: form.name.trim(),
      email: form.email.trim(),
      body: form.body.trim(),
    };

    client
      .post<Comment>('/comments', newComment)
      .then(res => {
        setComments(prev => [...prev, res]);
        setForm(prev => ({ ...prev, body: '' }));
      })
      .catch(() => {
        setHasSubmitError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleReset = () => {
    setForm(initialFormState);
    setHasSubmitError(false);
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
            className={`input ${form.hasErrorName ? 'is-danger' : ''}`}
            value={form.name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {form.hasErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {form.hasErrorName && (
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
            className={`input ${form.hasErrorEmail ? 'is-danger' : ''}`}
            value={form.email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {form.hasErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {form.hasErrorEmail && (
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
            className={`textarea ${form.hasErrorBody ? 'is-danger' : ''}`}
            value={form.body}
            onChange={handleChangeComText}
          />
        </div>

        {form.hasErrorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
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
      {hasSubmitError && (
        <p className="help is-danger" data-cy="CommentError">
          Failed to add a comment. Please try again.
        </p>
      )}
    </form>
  );
};
