import { FC, useState } from 'react';
import cn from 'classnames';

interface IProps {
  creatComment: (userName: string, title: string, userEmail: string) => void;
  creatLoadComments: boolean;
}

export const NewCommentForm: FC<IProps> = ({
  creatComment,
  creatLoadComments,
}) => {
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [userNameError, setUserNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);

  const reset = () => {
    setUserName('');
    setUserEmail('');
    setTitle('');
    setUserNameError(false);
    setTitleError(false);
    setUserEmailError(false);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setUserNameError(false);
  };

  const handleUserEmaile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
    setUserEmailError(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserNameError(!userName);
    setTitleError(!title);
    setUserEmailError(!userEmail);

    if (!userName || !title || !userEmail) {
      return;
    }

    creatComment(userName, title, userEmail);
    setTitle('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} onReset={reset}>
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
            className={cn('input', { 'is-danger': userNameError })}
            value={userName}
            onChange={handleUserName}
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
            className={cn('input', { 'is-danger': userEmailError })}
            value={userEmail}
            onChange={handleUserEmaile}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {userEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {userEmailError && (
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
            className={cn('textarea', { 'is-danger': titleError })}
            value={title}
            onChange={handleTitle}
          />
        </div>

        {titleError && (
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
              'is-loading': creatLoadComments,
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
