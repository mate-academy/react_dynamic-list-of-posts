import classNames from 'classnames';
import { FC } from 'react';
import { ErrorIcon } from '../Notifications/ErrorIcon';

type Props = {
  inputEmailValue: string,
  isEmailEmptyError: boolean,
  isEmailValid: boolean,
  setInputEmailValue: React.Dispatch<React.SetStateAction<string>>
  setIsEmailEmptyError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>,
};

export const EmailField: FC<Props> = ({
  inputEmailValue,
  isEmailEmptyError,
  isEmailValid,
  setInputEmailValue,
  setIsEmailEmptyError,
  setIsEmailValid,
}) => {
  const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmailValue(event.target.value);
    setIsEmailEmptyError(false);
    setIsEmailValid(true);
  };

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
          className={classNames(
            'input',
            { 'is-danger': isEmailEmptyError || !isEmailValid },
          )}
          value={inputEmailValue}
          onChange={onEmailChangeHandler}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>

        {(isEmailEmptyError || !isEmailValid) && (
          <ErrorIcon />
        )}
      </div>

      {isEmailEmptyError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
      )}

      {!isEmailEmptyError && !isEmailValid && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Email is not valid
        </p>
      )}
    </div>
  );
};
