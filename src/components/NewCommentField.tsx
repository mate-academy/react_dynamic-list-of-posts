import React from 'react';
import cn from 'classnames';

type Props = {
  name: string;
  label: string;
  dataCy: string;
  placeholder: string;
  id: string;
  onChange: (value: string, name: string) => void;
  required?: boolean;
  fieldType?: 'input' | 'textarea';
};
export const NewCommentField: React.FC<Props> = ({
  name,
  label,
  dataCy,
  id,
  placeholder,
  onChange,
  required = false,
  fieldType = 'input',
}) => {
  const [value, setValue] = React.useState('');

  const handleInputValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
    onChange(name, e.target.value);
  };

  const isError = required && !value.trim();

  const inputType =
    fieldType === 'input' ? (
      <>
        <input
          type="text"
          name={name}
          value={value}
          id={id}
          placeholder={placeholder}
          onChange={handleInputValueChange}
          className={cn('input', { 'is-danger': isError })}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {isError && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </>
    ) : (
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleInputValueChange}
        className={cn('textarea', { 'is-danger': isError })}
      />
    );

  return (
    <div className="field" data-cy={dataCy}>
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">{inputType}</div>

      <p className="help is-danger" data-cy="ErrorMessage">
        {isError && fieldType === 'input' && `${name} is required`}
        {isError && fieldType === 'textarea' && 'Enter some text'}
      </p>
    </div>
  );
};
