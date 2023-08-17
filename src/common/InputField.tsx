import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type InputFieldProps = {
  label: string;
  name: keyof CommentData;
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
  value: string;
  onChange: (name: keyof CommentData, value: string) => void;
  error: boolean;
  errorMessage?: string;
  dataCy?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
  dataCy,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    onChange(name, event.target.value.trimStart());
  };

  return (
    <div className="field" data-cy={dataCy}>
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            className={classNames('textarea', { 'is-danger': error })}
            value={value}
            onChange={handleChange}
            required
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className={classNames('input', { 'is-danger': error })}
            value={value}
            onChange={handleChange}
            required
          />
        )}

        <span className="icon is-small is-left">
          <i className={type === 'email' ? 'fas fa-envelope' : 'fas fa-user'} />
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
          {errorMessage || `${label} is required`}
        </p>
      )}
    </div>
  );
};
