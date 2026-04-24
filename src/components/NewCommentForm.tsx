import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { sendComment } from '../api';
import { PostContext } from '../store/PostProvider';
import { CommentsContext } from '../store/CommentsProvider';

type FormFields = 'name' | 'email' | 'comment';

export const NewCommentForm: React.FC = () => {
  const { post } = useContext(PostContext);
  const { setCommentsStatus, setComments, comments } =
    useContext(CommentsContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    comment: false,
  });

  const clearForm = () => {
    setForm({ name: '', email: '', comment: '' });
    setErrors({ name: false, email: false, comment: false });
  };

  const onChange = (
    input: FormFields,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [input]: e.target.value });
    setErrors({ ...errors, [input]: false });
  };

  const validateInput = (input: FormFields) => {
    if (form[input].trim().length === 0) {
      setErrors(prev => ({ ...prev, [input]: true }));
    } else {
      setErrors(prev => ({ ...prev, [input]: false }));
    }
  };

  const addComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Object.entries(form).forEach(([key]) => {
      validateInput(key as FormFields);
    });

    const isFormValid = Object.values(form).every(value => value.trim().length > 0);

    if (isFormValid) {
      setLoading(true);
      try {
        const created = await sendComment({
          postId: post!.id,
          name: form.name,
          email: form.email,
          body: form.comment,
        });

        if (!created || !created.id) {
          throw new Error('Invalid response from server');
        }

        setComments([...comments, created]);
        setLoading(false);
        setCommentsStatus('success');
        setForm({ ...form, comment: '' });
      } catch {
        setCommentsStatus('error');
      }
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addComment}>
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
              ['is-danger']: errors.name,
            })}
            value={form.name}
            onChange={e => onChange('name', e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
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

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              ['is-danger']: errors.email,
            })}
            value={form.email}
            onChange={e => onChange('email', e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
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
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('input', {
              ['is-danger']: errors.comment,
            })}
            value={form.comment}
            onChange={e => onChange('comment', e)}
          />
        </div>

        {errors.comment && (
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
              ['is-loading']: loading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={() => clearForm()}
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
