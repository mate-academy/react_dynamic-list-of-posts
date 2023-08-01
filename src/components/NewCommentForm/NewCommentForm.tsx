import classNames from 'classnames';
import { useContext, useState } from 'react';
import * as commentAPI from '../../api/commentAPI';
import { PostContext } from '../../context/PostContext';
import { Comment } from '../../types/Comment';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    selectedPost,
    setComments,
    setErrorMessage,
  } = useContext(PostContext);

  const allReset = () => {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setText('');
    setTextError(false);
  };

  const successReset = () => {
    setText('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) {
      setNameError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (!text) {
      setTextError(true);
    }

    if (!name || !email || !text) {
      return;
    }

    setLoading(true);

    const newComment = {
      postId: selectedPost?.id,
      name,
      email,
      body: text,
    };

    commentAPI.createComment(newComment as Comment)
      .then(comment => setComments(
        currentComments => [...currentComments, comment],
      ))
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setLoading(false));

    successReset();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              'is-danger': nameError,
            })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError(false);
            }}
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
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
            className={classNames('textarea', {
              'is-danger': textError,
            })}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setTextError(false);
            }}
          />
        </div>

        {textError && (
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
              'is-loading': loading,
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
            onClick={allReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
