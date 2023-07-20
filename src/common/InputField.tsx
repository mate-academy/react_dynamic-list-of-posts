import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
};

export const InputField: React.FC<Props> = ({
  label,
  value,
  onChange,
  error = false,
  errorMessage = 'Field is required',
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          type="text"
          className={classNames('input', { 'is-danger': error })}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(
            e.target.value,
          )}
        />
      </div>
      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
