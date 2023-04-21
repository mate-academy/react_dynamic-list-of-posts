import {
  FC,
  useState,
  FormEvent,
  SetStateAction,
} from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  postId: number,
  reloadComments: () => void,
};

export const NewCommentForm: FC<Props> = ({ postId, reloadComments }) => {
  const [errForm, setErrForm] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [errAdd, setErrAdd] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      setErrForm(prev => ({ ...prev, name: true }));
    }

    if (!email) {
      setErrForm(prev => ({ ...prev, email: true }));
    }

    if (!body) {
      setErrForm(prev => ({ ...prev, body: true }));
    }

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    if (name && email && body) {
      setIsLoader(true);

      client.post<SetStateAction<Comment[]>>('/comments', newComment)
        .then(() => {
          setErrAdd(false);
          setBody('');
          reloadComments();
        })
        .catch(() => setErrAdd(true))
        .finally(() => setIsLoader(false));
    }
  };

  const onClear = () => {
    setErrForm({
      name: false,
      email: false,
      body: false,
    });
    setName('');
    setEmail('');
    setBody('');
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
            className={cn(
              'input',
              { 'is-danger': errForm.name },
            )}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrForm(prev => ({ ...prev, name: false }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errForm.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errForm.name && (
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
            className={cn(
              'input',
              { 'is-danger': errForm.email },
            )}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrForm(prev => ({ ...prev, email: false }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errForm.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errForm.email && (
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
            className={cn(
              'textarea',
              { 'is-danger': errForm.body },
            )}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setErrForm(prev => ({ ...prev, body: false }));
            }}
          />
        </div>

        {errForm.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-link',
              { 'is-loading': isLoader },
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
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>
      {errAdd && (
        <div
          className="notification is-danger"
        >
          Comment wasn&quot;t sent, please try again!
        </div>
      )}
    </form>
  );
};
