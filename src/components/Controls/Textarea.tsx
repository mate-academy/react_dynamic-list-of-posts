import { ChangeEvent, FC } from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: boolean;
  errorText?: string;
};

const Textarea:FC<Props> = ({
  label, placeholder = '', value, onChange,
  error = false, errorText = '', required = false,
}) => {
  return (
    <div className="field" data-cy="BodyField">
      <label className="label" htmlFor={label}>
        {label}
      </label>

      <div className="control">
        <textarea
          id={label}
          name="body"
          placeholder={placeholder}
          className={classNames('textarea', { 'is-danger': error })}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>

      {error && (
        <p
          className="help is-danger"
          data-cy="ErrorMessage"
        >
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Textarea;
