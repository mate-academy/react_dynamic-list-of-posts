import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { addComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPostId: number;
  addNewComment: (v: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  addNewComment,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const validateForm = useCallback(() => {
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else {
      newErrors.name = '';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      newErrors.email = '';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Enter some text';
    } else {
      newErrors.comment = '';
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.comment;
  }, [formData, errors]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: '' }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      const newComment = {
        postId: selectedPostId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        body: formData.comment.trim(),
      };

      setIsSending(true);

      addComments(newComment)
        .then(res => {
          addNewComment(res);
          setFormData({
            name: formData.name.trim(),
            email: formData.email.trim(),
            comment: '',
          });
        })
        .finally(() => setIsSending(false));
    },
    [formData, selectedPostId, addNewComment, validateForm],
  );

  const clearForm = useCallback(() => {
    setFormData({ name: '', email: '', comment: '' });
    setErrors({ name: '', email: '', comment: '' });
  }, []);

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-name"
            name="name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': !!errors.name })}
            value={formData.name}
            onChange={handleInputChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
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
            id="comment-author-email"
            name="email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': !!errors.email })}
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
            name="comment"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': !!errors.comment })}
            value={formData.comment}
            onChange={handleInputChange}
          />
        </div>
        {errors.comment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.comment}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSending })}
            disabled={isSending}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
