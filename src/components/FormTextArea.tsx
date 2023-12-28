import React from 'react';
import classNames from 'classnames';
import { ErrorType } from '../types/ErrorType';

interface Props {
  name: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  state: [string, React.Dispatch<React.SetStateAction<string>>],
  errorState: [string, React.Dispatch<React.SetStateAction<ErrorType>>],
}

export const FormTextArea: React.FC<Props> = ({
  name,
  placeholder = '',
  required = false,
  disabled = false,
  state,
  errorState,
}) => {
  const [errorMessage, setErrorMessage] = errorState;
  const [value, setValue] = state;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);

    if (value.trim()) {
      setErrorMessage(ErrorType.none);
    }
  };

  return (
    <div className="field" data-cy={`${name}Field`}>
      <label className="label" htmlFor={`comment-${name}`}>
        Comment Text
      </label>

      <div className="control">
        <textarea
          id={`comment-${name}`}
          name="body"
          placeholder={placeholder}
          className={classNames('textarea', { 'is-danger': errorMessage })}
          required={required}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>

      {errorMessage && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
