import { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../api/request';
import { Comment } from '../types/Comment';

type NewCommentFormProps = {
  selectedPostId: number | null;
  onComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export function NewCommentForm({
  selectedPostId,
  onComments,
}: NewCommentFormProps) {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addCommentError, setAddCommentError] = useState(false);

  function validateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hasNameError = name.trim().length === 0;
    const hasEmailError = email.trim().length === 0;
    const hasBodyError = body.trim().length === 0;

    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setBodyError(hasBodyError);

    const hasErrors = hasNameError || hasEmailError || hasBodyError;

    if (hasErrors) {
      return;
    }

    if (selectedPostId) {
      const comment = {
        postId: selectedPostId,
        name: name,
        email: email,
        body: body,
      };

      setIsSubmitting(true);
      setAddCommentError(false);

      addComment(comment)
        .then((response: Comment) => {
          const newComment: Comment = {
            id: response.id,
            postId: response.postId,
            name: response.name,
            email: response.email,
            body: response.body,
          };

          onComments(comments => [...comments, newComment]);
          setBody('');
        })
        .catch(() => {
          setAddCommentError(true);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }

  function resetForm() {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={validateForm}>
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
            value={name}
            onChange={event => {
              setName(event.target.value);
              setNameError(false);
            }}
            className={classNames('input', { 'is-danger': nameError })}
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
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
            className={classNames('input', { 'is-danger': emailError })}
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
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setBodyError(false);
            }}
            className={classNames('textarea', { 'is-danger': bodyError })}
          />
        </div>

        {bodyError && (
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
              'is-loading': isSubmitting,
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
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>

      {addCommentError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
    </form>
  );
}
