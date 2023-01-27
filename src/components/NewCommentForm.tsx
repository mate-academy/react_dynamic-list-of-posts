import React, { useCallback, useContext, useState } from 'react';
import * as commentsService from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentsContext } from './CommentsContext';

type Props = {
  post: Post;
};

export const NewCommentForm: React.FC<Props> = ({ post }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    missingName: false,
    missingEmail: false,
    missingBody: false,
  });
  const { setComments } = useContext(CommentsContext);

  const postComment = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setErrors({
      missingName: !name,
      missingEmail: !email,
      missingBody: !body,
    });

    if (!name || !email || !body) {
      return;
    }

    setLoading(true);
    commentsService.post({
      postId: post.id,
      name,
      email,
      body,
    })
      .then((res) => {
        const newComment = {
          id: res.id,
          postId: post.id,
          name,
          email,
          body,
        } as Comment;

        setComments(prev => [...prev, newComment]);
      })
      .finally(() => setLoading(false));
    setName('');
    setEmail('');
    setBody('');
  };

  const resetComment = () => {
    setBody('');
    setErrors({
      missingName: false,
      missingEmail: false,
      missingBody: false,
    });
    setLoading(false);
  };

  const handleNameInput = useCallback((newName: string) => {
    if (errors.missingName) {
      setErrors(prev => ({
        ...prev,
        missingName: !newName.length,
      }));
    }

    setName(newName);
  }, [setName, errors.missingName]);

  const handleEmailInput = useCallback((newEmail: string) => {
    if (errors.missingEmail) {
      setErrors(prev => ({
        ...prev,
        missingEmail: !newEmail.length,
      }));
    }

    setEmail(newEmail);
  }, [setEmail, errors.missingEmail]);

  const handleBodyInput = useCallback((newBody: string) => {
    if (errors.missingBody) {
      setErrors(prev => ({
        ...prev,
        missingBody: !newBody.length,
      }));
    }

    setBody(newBody);
  }, [setBody, errors.missingBody]);

  return (
    <form data-cy="NewCommentForm">
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
            className={`input${errors.missingName ? ' is-danger' : ''}`}
            value={name}
            onChange={e => handleNameInput(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.missingName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.missingName && (
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
            className={`input${errors.missingEmail ? ' is-danger' : ''}`}
            value={email}
            onChange={e => handleEmailInput(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.missingEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.missingEmail && (
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
            className={`textarea${errors.missingBody ? ' is-danger' : ''}`}
            value={body}
            onChange={(e) => handleBodyInput(e.target.value)}
          />
        </div>

        {errors.missingBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link${loading ? ' is-loading' : ''}`}
            onClick={postComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetComment}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
