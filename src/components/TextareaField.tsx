import classNames from 'classnames';
import React from 'react';

type Props = {
  value: string;
  error: boolean;
  name: string;
  label: string;
  placeholder: string;
  errorMessage: string;
  onChange: (text: string) => void;
};

export const TextareaField: React.FC<Props> = ({
  value,
  error,
  name,
  label,
  placeholder,
  errorMessage,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className="field" data-cy={name}>
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <div className="control">
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={classNames('input', { 'is-danger': error })}
          value={value}
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
