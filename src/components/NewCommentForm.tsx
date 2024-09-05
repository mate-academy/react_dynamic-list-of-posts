import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { addPostComment } from '../api/Coments';
import classNames from 'classnames';

interface Props {
  postId: number | undefined;
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setPostComments,
}) => {
  const [newCommetAuthor, setNewCommentAuthor] = useState('');
  const [newCommetAuthorEmail, setNewCommetAuthorEmail] = useState('');
  const [newCommetText, setNewCommetText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputClass = classNames('input', {
    'is-danger': isSubmitting && !newCommetAuthor,
  });

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!newCommetAuthor || !newCommetAuthorEmail || !newCommetText) {
      return;
    }

    const newComment = {
      postId,
      name: newCommetAuthor,
      email: newCommetAuthorEmail,
      body: newCommetText,
    } as Comment;

    try {
      setLoading(true);
      await addPostComment(newComment);
      setPostComments(prevComments => [...prevComments, newComment]);

      setNewCommetText('');
    } catch (error) {
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setNewCommentAuthor('');
    setNewCommetAuthorEmail('');
    setNewCommetText('');
    setIsSubmitting(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleClick}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={newCommetAuthor}
            onChange={e => setNewCommentAuthor(e.target.value)}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={inputClass}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {isSubmitting && !newCommetAuthor && (
            <>
              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
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
            value={newCommetAuthorEmail}
            onChange={e => setNewCommetAuthorEmail(e.target.value)}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${isSubmitting && !newCommetAuthorEmail ? 'is-danger' : ''}`}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {isSubmitting && !newCommetAuthorEmail && (
            <>
              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
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
            value={newCommetText}
            onChange={e => setNewCommetText(e.target.value)}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={`textarea ${isSubmitting && !newCommetText ? 'is-danger' : ''}`}
          />
        </div>

        {isSubmitting && !newCommetText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${loading ? 'is-loading' : ''}`}
            disabled={loading}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
