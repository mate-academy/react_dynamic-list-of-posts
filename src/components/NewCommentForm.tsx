import cn from 'classnames';
import React, { type FormEvent, useState } from 'react';
import { useGlobalContext } from '../lib/GlobalContext';
import * as servicesComments from '../api/comments';

type Field = 'name' | 'email' | 'body';

type Props = {
  setHasErrorCreateComment: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  setHasErrorCreateComment,
}) => {
  const { selectPost, setComments } = useGlobalContext();
  const initialForm = {
    name: '',
    nameError: false,
    email: '',
    emailError: false,
    body: '',
    bodyError: false,
  };

  const [form, setForm] = useState(initialForm);

  const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);

  const nameEmpty = !form.name.trim();
  const emailEmpty = !form.email.trim();
  const bodyEmpty = !form.body.trim();

  const handleChangeField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: Field,
  ) => {
    const value = event.target.value;
    const keyError = `${fieldName}Error`;
    const key = `${fieldName}`;

    setForm(prevState => ({
      ...prevState,
      [keyError]: false,
      [key]: value,
    }));
  };

  const fieldValidation = () => {
    if (nameEmpty) {
      setForm(prevState => ({
        ...prevState,
        nameError: true,
      }));
    }

    if (emailEmpty) {
      setForm(prevState => ({
        ...prevState,
        emailError: true,
      }));
    }

    if (bodyEmpty) {
      setForm(prevState => ({
        ...prevState,
        bodyError: true,
      }));
    }
  };

  const addNewComment = async () => {
    const { email, name, body } = form;

    if (selectPost) {
      const newComment = {
        postId: selectPost.userId,
        name,
        email,
        body,
      };

      try {
        setIsLoadingCreatePost(true);

        const data = await servicesComments.createComment(newComment);

        setComments(prevState => [...prevState, data]);
      } catch (error) {
        setHasErrorCreateComment(true);
      } finally {
        setIsLoadingCreatePost(false);
      }
    }
  };

  const resetForm = () => {
    setForm(prevState => ({
      ...prevState,
      ...initialForm,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isError = nameEmpty || emailEmpty || bodyEmpty;

    fieldValidation();

    if (isError) {
      return;
    }

    addNewComment();

    setForm(prevState => ({
      ...prevState,
      body: '',
    }));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} onReset={resetForm}>
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
              'is-danger': form.nameError,
            })}
            value={form.name}
            onChange={event => {
              handleChangeField(event, 'name');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {form.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {form.nameError && (
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
              'is-danger': form.emailError,
            })}
            value={form.email}
            onChange={event => handleChangeField(event, 'email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {form.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {form.emailError && (
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
            className={cn('textarea', {
              'is-danger': form.bodyError,
            })}
            value={form.body}
            onChange={event => handleChangeField(event, 'body')}
          />
        </div>

        {form.bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoadingCreatePost,
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
