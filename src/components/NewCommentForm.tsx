import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  selectedPost: Post;
  onAddComment: (comment: Comment) => void;
}

// Виносимо дефолтний обєкт на самий верх файлу, щоб обійти баг відступів
const INITIAL_ERRORS = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  selectedPost,
  onAddComment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors(INITIAL_ERRORS);
    setSubmitError('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrors(prev => ({ ...prev, name: false }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors(prev => ({ ...prev, email: false }));
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setErrors(prev => ({ ...prev, body: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      body: !body.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const dataToPost = {
      postId: selectedPost.id,
      name,
      email,
      body,
    };

    client
      .post<Comment>('/comments', dataToPost)
      .then(newComment => {
        onAddComment(newComment);
        setBody('');
      })
      .catch(() => setSubmitError('Unable to add a comment'))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {submitError && (
        <div className="notification is-danger" data-cy="ErrorMessage">
          {submitError}
        </div>
      )}

      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-right">
          <input
            id="comment-author-name"
            data-cy="name"
            type="text"
            className={`input ${errors.name ? 'is-danger' : ''}`}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-right">
          <input
            id="comment-author-email"
            data-cy="email"
            type="email"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            data-cy="body"
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            placeholder="Type comment here..."
            value={body}
            onChange={handleBodyChange}
          />
        </div>
        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Comment is required
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
          >
            Add Comment
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            data-cy="ClearButton"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
