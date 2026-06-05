import { useState } from 'react';
import type { CommentData } from '../../types/Comment';
import type { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

interface NewCommentFormProps {
  addComment: (comment: Comment) => void;
  postId: number;
}

export const NewCommentForm = ({ addComment, postId }: NewCommentFormProps) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);
  const [isLoaderBtn, setIsLoaderBtn] = useState(false);

  const handleClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);

    const newComment: CommentData = {
      name: authorName,
      email: authorEmail,
      body: commentBody,
    };

    let hasError = false;

    if (authorName.trim() === '') {
      setIsNameError(true);
      hasError = true;
    }

    if (authorEmail.trim() === '') {
      setIsEmailError(true);
      hasError = true;
    }

    if (commentBody.trim() === '') {
      setIsBodyError(true);
      hasError = true;
    }

    if (hasError === true) {
      return;
    }

    setIsLoaderBtn(true);

    const payload = {
      postId,
      ...newComment,
    };

    client
      .post<Comment>('/comments', payload)
      .then(createdComment => {
        addComment(createdComment);

        setCommentBody('');

        setIsNameError(false);
        setIsEmailError(false);
        setIsBodyError(false);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoaderBtn(false);
      });
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
    setIsNameError(false);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(event.target.value);
    setIsEmailError(false);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(event.target.value);
    setIsBodyError(false);
  };

  return (
    <form onSubmit={handleSubmit} data-cy="NewCommentForm">
      {/* comment-author-name */}
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
            className={isNameError ? 'input is-danger' : 'input'}
            onChange={handleName}
            value={authorName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {isNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      {/* comment-author-email */}
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
            className={isEmailError ? 'input is-danger' : 'input'}
            onChange={handleEmail}
            value={authorEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {isEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      {/* comment-body */}
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={isBodyError ? 'textarea is-danger' : 'textarea'}
            onChange={handleBody}
            value={commentBody}
          />
        </div>
        {isBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>
      {/* is-loading */}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              isLoaderBtn ? 'button is-link is-loading' : 'button is-link'
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={handleClear}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
