import classNames from 'classnames';
import React from 'react';
import { exclamationTriangleIcon } from '../utils/strings/icons';

type Props = {
  value: string;
  error: boolean;
  name: string;
  label: string;
  placeholder: string;
  errorMessage: string;
  icon: string;
  onChange: (text: string) => void;
};

export const InputField: React.FC<Props> = ({
  value,
  error,
  name,
  label,
  placeholder,
  errorMessage,
  icon,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className="field" data-cy={name}>
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          className={classNames('input', { 'is-danger': error })}
          value={value}
          onChange={handleChange}
        />

        <span className="icon is-small is-left">
          <i className={`fas ${icon}`} />
        </span>

        {error && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className={`fas ${exclamationTriangleIcon}`} />
          </span>
        )}
      </div>

      {error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
