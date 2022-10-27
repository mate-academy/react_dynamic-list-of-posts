import classNames from 'classnames';
import React, {
  ChangeEvent, FormEvent, SetStateAction, useState,
} from 'react';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { NotificationMassege } from '../types/NotificationMassege';

type Props = {
  postId: number;
  setComments: (comment: SetStateAction<Comment[]>) => void;
  onNotification: (massege: NotificationMassege) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId, setComments, onNotification,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !body) {
      setErrors({
        name: !name,
        email: !email,
        body: !body,
      });

      return;
    }

    setLoading(true);

    try {
      const newComment = await addComment(postId, name, email, body);

      setComments(current => [...current, newComment]);
    } catch {
      onNotification(NotificationMassege.ADD_COMMENT);
      setComments([]);
    } finally {
      setLoading(false);
      setBody('');
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (e.target.name) {
      case 'name':
        if (errors.name) {
          setErrors(current => ({
            ...current,
            name: false,
          }));
        }

        setName(e.target.value);
        break;

      case 'email':
        if (errors.email) {
          setErrors(current => ({
            ...current,
            email: false,
          }));
        }

        setEmail(e.target.value);
        break;

      case 'body':
        if (errors.body) {
          setErrors(current => ({
            ...current,
            body: false,
          }));
        }

        setBody(e.target.value);
        break;

      default:
        break;
    }
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setBody('');

    setErrors({
      name: false,
      email: false,
      body: false,
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
            className={classNames(
              'input',
              { 'is-danger': errors.name },
            )}
            value={name}
            onChange={handleChange}
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
            className={classNames(
              'input',
              { 'is-danger': errors.email },
            )}
            value={email}
            onChange={handleChange}
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
            className={classNames(
              'textarea',
              { 'is-danger': errors.body },
            )}
            value={body}
            onChange={handleChange}
          />
        </div>

        {errors.body && (
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
              { 'is-loading': loading },
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
            onClick={clearFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
