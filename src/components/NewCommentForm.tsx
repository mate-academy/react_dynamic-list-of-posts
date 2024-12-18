import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type InputNames = 'name' | 'mail' | 'comment';

interface Props {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  selectedPost: Post;
  setLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  selectedPost,
  setLoadingError,
  setShowForm,
}) => {
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [commentText, setCommentText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [userNameError, setUserNameError] = useState(false);
  const [userMailError, setUserMailError] = useState(false);
  const [commentTextError, setCommentTextError] = useState(false);

  const handleFullForm = (e: ChangeEvent, inputName: InputNames) => {
    switch (inputName) {
      case 'name': {
        setUserName(e.target.value);
        setUserNameError(false);
        break;
      }

      case 'mail': {
        setUserMail(e.target.value);
        setUserMailError(false);
        break;
      }

      case 'comment': {
        setCommentText(e.target.value);
        setCommentTextError(false);
        break;
      }
    }
  };

  const cleanForm = () => {
    setUserName('');
    setUserMail('');
    setCommentText('');

    setUserNameError(false);
    setUserMailError(false);
    setCommentTextError(false);
  };

  const saveInputDataOnSuccess = () => {
    setUserName(userName);
    setUserMail(userMail);
    setCommentText('');
  };

  const validateInput = (input: string): boolean => {
    const doesEmpty = input.trim().length > 0;

    return doesEmpty;
  };

  const addComments = async () => {
    const newData = {
      postId: selectedPost.id,
      name: userName,
      email: userMail,
      body: commentText,
    };

    setIsLoading(true);

    try {
      const newComment: Comment = await client.post('/comments', newData);

      setComments(prevComment => [...prevComment, newComment]);

      saveInputDataOnSuccess();
    } catch {
      setLoadingError(true);
      setComments([]);
      cleanForm();
      setShowForm(false);
    }

    setIsLoading(false);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = [
      { value: userName, setError: setUserNameError },
      { value: userMail, setError: setUserMailError },
      { value: commentText, setError: setCommentTextError },
    ];

    const allEmpty = inputs.every(input => !validateInput(input.value));

    if (allEmpty) {
      inputs.forEach(input => input.setError(true));

      return;
    }

    const isError = inputs.some(input => {
      if (!validateInput(input.value)) {
        input.setError(true);

        return true;
      }

      return false;
    });

    if (isError) {
      return;
    }

    addComments();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={submit}>
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
            className={classNames('input', { 'is-danger': userNameError })}
            value={userName}
            onChange={e => {
              handleFullForm(e, 'name');
            }}
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
            className={classNames('input', { 'is-danger': userMailError })}
            value={userMail}
            onChange={e => {
              handleFullForm(e, 'mail');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {userMailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {userMailError && (
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
            className={classNames('textarea', {
              'is-danger': commentTextError,
            })}
            value={commentText}
            onChange={e => {
              handleFullForm(e, 'comment');
            }}
          />
        </div>

        {commentTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
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
            onClick={cleanForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
