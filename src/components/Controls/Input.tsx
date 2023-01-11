import { ChangeEvent, FC } from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: boolean;
  errorText?: string;
};

const Input:FC<Props> = ({
  label, placeholder = '', value, onChange,
  error = false, errorText = '', required = false,
}) => {
  return (
    <div className="field" data-cy="NameField">
      <label className="label" htmlFor={label}>
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type="text"
          name="name"
          id={label}
          placeholder={placeholder}
          className={classNames('input', { 'is-danger': error })}
          value={value}
          onChange={onChange}
          required={required}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {error && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
