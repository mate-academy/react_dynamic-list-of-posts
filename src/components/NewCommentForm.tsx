import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { useUserContext } from './Context/Context';
import { User } from '../types/User';

export const NewCommentForm: React.FC = () => {
  const {
    comments,
    setUsers,
    setComments,
    postSelected,
    isLoadingCommentSending,
    setIsLoadingCommentSending,
  } = useUserContext();

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMassageError] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
    postId: postSelected?.id,
  });

  const handleInputChange = (e: React
    .ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setNameError(false);

        break;

      case 'email':
        setEmailError(false);

        break;

      case 'body':
        setMassageError(false);

        break;

      default:
        break;
    }

    if (name === 'name') {
      setNameError(false);
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoadingCommentSending(true);

    const { name, email, body } = formData;

    let hasErrors = false;

    if (name.trim() === '' || name === '') {
      setNameError(true);
      hasErrors = true;
    }

    if (email.trim() === '' || email === '') {
      setEmailError(true);
      hasErrors = true;
    }

    if (body.trim() === '' || body === '') {
      setMassageError(true);
      hasErrors = true;
    }

    if (hasErrors) {
      setIsLoadingCommentSending(false);

      return;
    }

    if (nameError === false && emailError === false
      && messageError === false) {
      const postId = postSelected?.id;

      if (postId !== undefined) {
        const newComment = {
          id: comments.length + 1,
          postId,
          name,
          email,
          body,
        };

        client.post<Comment[]>('/comments', newComment)
          .then(() => {
            setComments(prevComments => [...prevComments, newComment]);
          });
      }

      client.post<User[] | null>('/users', { name, email })
        .then((response: User[] | null) => {
          if (response !== null) {
            setUsers(response);
          }
        })
        .finally(() => {
          setFormData({
            name: '',
            email: '',
            body: '',
            postId: postSelected?.id,
          });

          setIsLoadingCommentSending(false);
        });
    }
  };

  const reset = () => {
    setFormData({
      name: '',
      email: '',
      body: '',
      postId: postSelected?.id,
    });
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
            value={formData.name}
            onChange={handleInputChange}
            className={classNames(
              'input',
              {
                'is-danger': nameError,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {nameError && (
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
            value={formData.email}
            onChange={handleInputChange}
            className={classNames(
              'input',
              {
                'is-danger': emailError,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {emailError && (
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
            onChange={handleInputChange}
            value={formData.body}
            className={classNames(
              'textarea',
              {
                'is-danger': messageError,
              },
            )}
          />
        </div>

        {messageError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              {
                'is-loading': isLoadingCommentSending,
              },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
