import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (v: CommentData) => void;
  isLoadingBtn: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
  isLoadingBtn,
}) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [isError, setIsError] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setIsError(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const validate = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !formData.email.includes('@'),
      body: !formData.body.trim(),
    };

    setIsError(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleAddComment = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!validate()) {
      return;
    }

    onAddComment(formData);

    setFormData(prevFormData => ({
      ...prevFormData,
      body: '',
    }));
  };

  const handleClearComment = (evnt: React.FormEvent<HTMLFormElement>) => {
    evnt.preventDefault();
    setIsError({ name: false, email: false, body: false });

    setFormData({ name: '', email: '', body: '' });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddComment}
      onReset={handleClearComment}
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
            className={classNames('input', { 'is-danger': isError.name })}
            value={formData.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {isError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError.name && (
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
            className={classNames('input', { 'is-danger': isError.email })}
            value={formData.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {isError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {isError.email && (
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
            className={classNames('textarea', { 'is-danger': isError.body })}
            value={formData.body}
            onChange={handleInputChange}
          />
        </div>
        {isError.body && (
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
              'is-loading': isLoadingBtn,
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
