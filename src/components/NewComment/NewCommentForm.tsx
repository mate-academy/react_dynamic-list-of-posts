import React, { useState } from 'react';
import classNames from 'classnames';
import { FormErrorIcon } from '../FormErrorIcon/FormErrorIcon';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { ErrorMessage } from '../../constants/ErrorMessage';
import { Comment } from '../../types/Comment';

interface Props {
  postId: number;
  onAddComment: (commentData: Omit<Comment, 'id'>) => void;
  setIsFormOpen: (open: boolean) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onAddComment,
  setIsFormOpen,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      name: name.trim() === '',
      email: email.trim() === '',
      body: body.trim() === '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsLoading(true);

    onAddComment({
      postId,
      name,
      email,
      body,
    });

    setTimeout(() => {
      setName('');
      setEmail('');
      setBody('');
      setErrors({ name: false, email: false, body: false });
      setIsLoading(false);
      setIsFormOpen(false);
    }, 1000);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({ name: false, email: false, body: false });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.name && <FormErrorIcon dataCy="ErrorIcon" />}
        </div>
        {errors.name && (
          <ErrorNotification
            dataCy="ErrorMessage"
            type="danger"
            message={ErrorMessage.NAME_ERROR}
          />
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
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.email && <FormErrorIcon dataCy="ErrorIcon" />}
        </div>
        {errors.email && (
          <ErrorNotification
            dataCy="ErrorMessage"
            type="danger"
            message={ErrorMessage.EMAIL_ERROR}
          />
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
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
        {errors.body && (
          <ErrorNotification
            dataCy="ErrorMessage"
            type="danger"
            message={ErrorMessage.TEXT_ERROR}
          />
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': loading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
