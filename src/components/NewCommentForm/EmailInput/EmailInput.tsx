import {
  FC,
  memo,
  useMemo,
} from 'react';

import classNames from 'classnames';
import { ErrorMessage } from '../ErrorMessage';
import { ErrorTriangle } from '../ErrorTriangle';

type Props = {
  email: string;
  isEmail: boolean;
  isEmailValid: boolean;
  handleEmailInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EmailInput: FC<Props> = memo(({
  email,
  isEmail,
  isEmailValid,
  handleEmailInput,
}) => {
  const invalid = useMemo(
    () => !isEmail || !isEmailValid,
    [isEmail, isEmailValid],
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
            { 'is-danger': invalid },
          )}
          value={email}
          onChange={handleEmailInput}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>

        {invalid && <ErrorTriangle />}
      </div>

      {!isEmail && (
        <ErrorMessage>
          Email is required!
        </ErrorMessage>
      )}

      {!isEmailValid && (
        <ErrorMessage>
          You have entered an invalid email address!
        </ErrorMessage>
      )}
    </div>
  );
});
