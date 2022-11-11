import { FC, memo } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../ErrorMessage';
import { ErrorTriangle } from '../ErrorTriangle';

type Props = {
  name: string,
  isValidName: boolean,
  handleNameInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const NameInput: FC<Props> = memo(({
  name, isValidName, handleNameInput,
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
            { 'is-danger': !isValidName },
          )}
          value={name}
          onChange={handleNameInput}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {!isValidName && <ErrorTriangle />}
      </div>

      {!isValidName && (
        <ErrorMessage>
          Name is required
        </ErrorMessage>
      )}
    </div>
  );
});
