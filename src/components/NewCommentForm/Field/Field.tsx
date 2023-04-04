import { ChangeEvent, FC } from 'react';
import cn from 'classnames';

interface Props {
  value: string,
  label: string,
  errorType: boolean,
  placeHolder: string,
  notValid?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const Field: FC<Props> = (props) => {
  const {
    value,
    label,
    onChange,
    errorType,
    notValid,
    placeHolder,
  } = props;

  return (
    <div className="field" data-cy="NameField">
      <label className="label" htmlFor="comment-author-name">
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          value={value}
          placeholder={placeHolder}
          className={cn('input', {
            'is-danger': errorType,
          })}
          onChange={onChange}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {errorType && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {errorType && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Field is required
        </p>
      )}

      {(!errorType && notValid) && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Email is not valid
        </p>
      )}
    </div>
  );
};
