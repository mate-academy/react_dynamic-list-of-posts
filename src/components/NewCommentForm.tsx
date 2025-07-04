import { useState } from 'react';
import { Comment } from '../types/Comment';
import { createComment } from '../api/user';
import { Post } from '../types/Post';

import cn from 'classnames';

interface NewCommentFormProps {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  selectedPost: Post;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  setComments,
  selectedPost,
}) => {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);

  const [commentBody, setCommentBody] = useState('');
  const [commentBodyError, setCommentBodyError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const addComment = async ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    setIsLoading(true);

    try {
      const newComment = await createComment({
        postId,
        name,
        email,
        body,
      });

      setComments(currentComments => [...currentComments, newComment]);

      setCommentBody('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = {
      name: !userName.trim(),
      email: !userEmail.trim(),
      body: !commentBody.trim(),
    };

    setUserNameError(errors.name);
    setUserEmailError(errors.email);
    setCommentBodyError(errors.body);

    if (errors.name || errors.email || errors.body) {
      return;
    }

    addComment({
      postId: selectedPost.id,
      name: userName,
      email: userEmail,
      body: commentBody,
    });
  };

  const handleClear = () => {
    setUserName('');
    setUserNameError(false);
    setUserEmail('');
    setUserEmailError(false);
    setCommentBody('');
    setCommentBodyError(false);
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
            className={cn('input', {
              'is-danger': userNameError,
            })}
            value={userName}
            onChange={event => setUserName(event.target.value.trimStart())}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {userNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {userNameError && (
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
            className={cn('input', {
              'is-danger': userEmailError,
            })}
            value={userEmail}
            onChange={event => setUserEmail(event.target.value.trimStart())}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {userEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {userEmailError && (
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
            className={cn('textarea', { 'is-danger': commentBodyError })}
            value={commentBody}
            onChange={event => setCommentBody(event.target.value.trimStart())}
          />
        </div>
        {commentBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link ', { 'is-loading': isLoading })}
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
