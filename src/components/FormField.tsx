import React from 'react';
import classNames from 'classnames';
import { InputType } from '../types/InputType';
import { ErrorType } from '../types/ErrorType';

interface Props {
  name: string,
  icon: string,
  type?: InputType,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  state: [string, React.Dispatch<React.SetStateAction<string>>],
  errorState: [string, React.Dispatch<React.SetStateAction<ErrorType>>],
}

export const FormField: React.FC<Props> = ({
  name,
  icon,
  type = InputType.Text,
  placeholder = '',
  required = false,
  disabled = false,
  state,
  errorState,
}) => {
  const [errorMessage, setErrorMessage] = errorState;
  const [value, setValue] = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (value.trim()) {
      setErrorMessage(ErrorType.none);
    }
  };

  return (
    <div className="field" data-cy="NameField">
      <label className="label" htmlFor={`comment-author-${name}`}>
        Author
        {' '}
        {name}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type={type}
          name={name}
          id={`comment-author-${name}`}
          placeholder={placeholder}
          className={classNames('input', { 'is-danger': errorMessage })}
          required={required}
          disabled={disabled}
          value={value}
          onChange={handleChange}
        />

        <span className="icon is-small is-left">
          <i className={`fas fa-${icon}`} />
        </span>

        {errorMessage && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
