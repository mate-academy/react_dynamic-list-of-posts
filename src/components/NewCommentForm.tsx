import { ChangeEvent, FormEvent, useState } from 'react';
import { Comment } from '../types/Comment';
import cn from 'classnames';

type Props = {
  handleAddComment: (comment: Omit<Comment, 'id'>) => Promise<void>;
  postId: number;
};

export const NewCommentForm = ({ handleAddComment, postId }: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const addComment = async (
    inputName: string,
    inputEmail: string,
    inputBody: string,
  ) => {
    setLoading(true);

    const newComment: Omit<Comment, 'id'> = {
      postId,
      name: inputName,
      email: inputEmail,
      body: inputBody,
    };

    try {
      await handleAddComment(newComment);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    if (
      trimmedName.length === 0 ||
      trimmedEmail.length === 0 ||
      trimmedBody.length === 0
    ) {
      setError(true);

      return;
    }

    if (!trimmedEmail.includes('@')) {
      setError(true);

      return;
    }

    await addComment(trimmedName, trimmedEmail, trimmedBody);
    setBody('');
    setError(false);
  };

  const handleClear = () => {
    setEmail('');
    setName('');
    setBody('');
    setError(false);
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
            className={cn('input', { 'is-danger': name.length === 0 && error })}
            onChange={e => handleNameChange(e)}
            value={name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {name.length === 0 && error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {name.length === 0 && error && (
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
              'is-danger':
                error && (email.length === 0 || !email.includes('@')),
            })}
            onChange={e => handleEmailChange(e)}
            value={email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {error && (email.length === 0 || !email.includes('@')) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error && (email.length === 0 || !email.includes('@')) && (
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
              'is-danger': error && body.length === 0,
            })}
            onChange={e => handleBodyChange(e)}
            value={body}
          />
        </div>

        {error && body.length === 0 && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
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
