import React, { useState } from 'react';
import cn from 'classnames';
import {
  CommentInfo,
  CommentInfoError,
  Error,
  Loading,
} from '../types/Helpers';
import { addComment } from '../api/comments';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  loading: Loading;
  setLoading: React.Dispatch<React.SetStateAction<Loading>>;
  setError: React.Dispatch<React.SetStateAction<Error>>;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  comments,
  setComments,
  loading,
  setLoading,
  setError,
}) => {
  const [input, setInput] = useState<CommentInfo>({
    name: '',
    email: '',
    body: '',
  });
  const [inputError, setInputError] = useState<CommentInfoError>({
    name: false,
    email: false,
    body: false,
  });

  const { name, email, body } = input;

  /* eslint-disable */
  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof CommentInfo,
  ) => {
    const value = e.target.value;

    setInput(prev => ({ ...prev, [field]: value }));

    if (field === 'name' && value) {
      setInputError(prev => ({ ...prev, name: false }));
    }

    if (field === 'email' && value) {
      setInputError(prev => ({ ...prev, email: false }));
    }

    if (field === 'body' && value) {
      setInputError(prev => ({ ...prev, body: false }));
    }
  };
  /* eslint-enable */

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id } = selectedPost;

    if (!name.trim() || !email.trim() || !body.trim()) {
      if (!name.trim()) {
        setInputError(prev => ({ ...prev, name: true }));
      }

      if (!email.trim()) {
        setInputError(prev => ({ ...prev, email: true }));
      }

      if (!body.trim()) {
        setInputError(prev => ({ ...prev, body: true }));
      }

      return;
    }

    setLoading('Form');

    try {
      const addedComment = await addComment({ name, email, body, postId: id });

      setComments([...comments, addedComment]);
      setInput({ ...input, body: '' });
      setError(null);
    } catch {
      setError('Add comment');
      setInput(input);
    } finally {
      setLoading(null);
    }
  };

  const handleClearForm = () => {
    setInput({ name: '', email: '', body: '' });
    setInputError({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handlePostComment}>
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
            className={cn('input', {
              'is-danger': !!inputError.name,
            })}
            value={input.name}
            onChange={e => handleInput(e, 'name')}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputError.name && (
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
            className={cn('input', {
              'is-danger': !!inputError.email,
            })}
            value={input.email}
            onChange={e => handleInput(e, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputError.email && (
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
            className={cn('input', {
              'is-danger': !!inputError.body,
            })}
            value={input.body}
            onChange={e => handleInput(e, 'body')}
          />
        </div>

        {inputError.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          {/* add is-loading on load */}
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': loading === 'Form',
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
