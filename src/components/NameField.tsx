import classNames from 'classnames';

interface NameFieldProps {
  setName: (name: string) => void;
  isNameError: boolean;
}

export const NameField: React.FC<NameFieldProps> = ({
  setName,
  isNameError,
}) => {
  return (
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
          className={classNames('input', { 'is-danger': isNameError })}
          onChange={e => setName(e.target.value)}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {isNameError && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {isNameError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
      )}
    </div>
  );
};
