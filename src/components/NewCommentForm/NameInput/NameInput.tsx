import {
  FC,
  memo,
} from 'react';

import classNames from 'classnames';
import { ErrorTriangle } from '../ErrorTriangle';
import { ErrorMessage } from '../ErrorMessage';

type Props = {
  name: string;
  isNameValid: boolean;
  handleNameInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NameInput: FC<Props> = memo(({
  name,
  isNameValid,
  handleNameInput,
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
          className={classNames(
            'input',
            { 'is-danger': !isNameValid },
          )}
          value={name}
          onChange={handleNameInput}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {!isNameValid && <ErrorTriangle />}
      </div>

      {!isNameValid && (
        <ErrorMessage>
          Name is required!
        </ErrorMessage>
      )}
    </div>
  );
});
