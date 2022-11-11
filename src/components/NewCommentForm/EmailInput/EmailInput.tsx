import { FC, useMemo, memo } from 'react';
import classNames from 'classnames';
import { ErrorTriangle } from '../ErrorTriangle';
import { ErrorMessage } from '../ErrorMessage';

type Props = {
  email: string,
  isValidEmail: boolean,
  isEmail: boolean,
  handleEmailInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const EmailInput: FC<Props> = memo(({
  email, isEmail, isValidEmail, handleEmailInput,
}) => {
  const isValid = useMemo(
    () => !isValidEmail || !isEmail, [isEmail, isValidEmail],
  );

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
            { 'is-danger': isValid },
          )}
          value={email}
          onChange={handleEmailInput}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>

        {isValid && <ErrorTriangle />}
      </div>

      {!isEmail && (
        <ErrorMessage>
          Email is required
        </ErrorMessage>
      )}

      {!isValidEmail && (
        <ErrorMessage>
          Required format: example@gmail.com
        </ErrorMessage>
      )}
    </div>
  );
});
