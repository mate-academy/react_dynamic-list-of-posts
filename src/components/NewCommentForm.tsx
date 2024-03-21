import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

const initialUserData = {
  name: '',
  email: '',
  body: '',
};
const initialUserDataErrors = {
  name: '',
  email: '',
  body: '',
};

type Props = {
  postId?: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId = 0,
  setComments,
}) => {
  const [userData, setUserData] = useState(initialUserData);
  const [userDataErrors, setUserDataErrors] = useState(initialUserDataErrors);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.name.trim()) {
      setUserDataErrors(prev => ({
        ...prev,
        name: 'Please enter a valid name',
      }));
    }

    if (!userData.email.trim()) {
      setUserDataErrors(prev => ({
        ...prev,
        email: 'Sorry, please type a valid email',
      }));
    }

    if (!userData.body.trim()) {
      setUserDataErrors(prev => ({
        ...prev,
        body: 'This field should not be empty',
      }));
    }

    const isAnyEmptyField = Object.values(userData).some(
      item => item.trim() === '',
    );

    if (isAnyEmptyField) {
      return;
    }

    const isAnyError = Object.values(userDataErrors).some(
      item => item.trim() !== '',
    );

    if (!isAnyError && !!postId) {
      setIsUpdating(true);

      const newComment: CommentData = {
        postId,
        name: userData.name,
        email: userData.email,
        body: userData.body,
      };

      client
        .post('/comments', newComment)
        .then(data => {
          setComments(prev => [...prev, data as Comment]);
          setUserData(prev => ({ ...prev, body: '' }));
        })
        .catch(() => {
          throw Error('Something went wrong!');
        })
        .finally(() => setIsUpdating(false));
    }
  };

  const handleUserData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    setUserDataErrors(prev => ({ ...prev, [key]: '' }));
    setUserData(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleClear = () => {
    setUserData(initialUserData);
    setUserDataErrors(initialUserDataErrors);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => handleSubmitForm(e)}
      onReset={() => handleClear()}
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
            className={classNames('input', {
              'is-danger': userDataErrors.name,
            })}
            value={userData.name}
            onChange={e => handleUserData(e, 'name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {userDataErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {userDataErrors.name && (
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
            className={classNames('input', {
              'is-danger': userDataErrors.email,
            })}
            value={userData.email}
            onChange={e => handleUserData(e, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {userDataErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {userDataErrors.email && (
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
              'is-danger': userDataErrors.body,
            })}
            value={userData.body}
            onChange={e => handleUserData(e, 'body')}
          />
        </div>

        {userDataErrors.body && (
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
              'is-loading': isUpdating,
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
