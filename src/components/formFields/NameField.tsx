import classNames from 'classnames';
import { FC } from 'react';
import { ErrorIcon } from '../Notifications/ErrorIcon';

type Props = {
  isNameEmptyError: boolean,
  setIsNameEmptyError: React.Dispatch<React.SetStateAction<boolean>>,
  inputNameValue: string,
  setInputNameValue: React.Dispatch<React.SetStateAction<string>>,
};

export const NameField: FC<Props> = ({
  isNameEmptyError,
  setIsNameEmptyError,
  inputNameValue,
  setInputNameValue,
}) => {
  const onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value);
    setIsNameEmptyError(false);
  };

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
          className={classNames(
            'input',
            { 'is-danger': isNameEmptyError },
          )}
          value={inputNameValue}
          onChange={onNameChangeHandler}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {isNameEmptyError && (
          <ErrorIcon />
        )}
      </div>

      {isNameEmptyError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
      )}
    </div>
  );
};
