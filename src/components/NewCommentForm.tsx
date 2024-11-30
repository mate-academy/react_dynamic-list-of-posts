import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CommentData } from '../types/Comment';
import cn from 'classnames';

type Props = {
  loader: boolean;
  onAdd: (newComment: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ loader, onAdd }) => {
  const [newComment, setNewComment] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setNewComment(prevComment => ({ ...prevComment, [name]: value }));
    setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
  };

  const handleReset = () => {
    setNewComment({
      name: '',
      email: '',
      body: '',
    });
    setTouched({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isNameEmpty = newComment.name === '';
    const isEmailEmpty = newComment.email === '';
    const isBodyEmpty = newComment.body === '';

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      setTouched({
        name: isNameEmpty,
        email: isEmailEmpty,
        body: isBodyEmpty,
      });

      return;
    }

    await onAdd(newComment);
    setNewComment(prevComment => ({ ...prevComment, body: '' }));
    setTouched({ name: false, email: false, body: false });
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
            value={newComment.name}
            onChange={handleInputChange}
            className={cn('input', {
              'is-danger': touched.name && newComment.name === '',
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
        {touched.name && newComment.name === '' && (
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

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            value={newComment.email}
            onChange={handleInputChange}
            className={cn('input', {
              'is-danger': touched.email && newComment.email === '',
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>
        {touched.email && newComment.email === '' && (
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

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            value={newComment.body}
            onChange={handleInputChange}
            className={cn('textarea', {
              'is-danger': touched.body && newComment.body === '',
            })}
          />
        </div>
        {touched.body && newComment.body === '' && (
          <>
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
            <p className="help is-danger" data-cy="ErrorMessage">
              Text is required
            </p>
          </>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': loader,
            })}
          >
            Add
          </button>
        </div>
        <div className="control">
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
