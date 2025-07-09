import classNames from 'classnames';

interface EmailFieldProps {
  setEmail: (email: string) => void;
  isEmailError: boolean;
}

export const EmailField: React.FC<EmailFieldProps> = ({
  setEmail,
  isEmailError,
}) => {
  return (
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
          className={classNames('input', { 'is-danger': isEmailError })}
          onChange={e => setEmail(e.target.value)}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>

        {isEmailError && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {isEmailError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
      )}
    </div>
  );
};
