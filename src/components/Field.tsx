import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface Props {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  lIcon: string;
  error: string | undefined;
  dataCy: string;
  name: string;
}
export const Field = (props: Props) => {
  const {
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    lIcon,
    error,
    dataCy,
    name,
  } = props;

  return (
    <div className="field" data-cy={dataCy}>
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className={classNames('input', {
            'is-danger': error,
          })}
          value={value}
          onChange={onChange}
        />

        <span className="icon is-small is-left">
          <i className={`fas ${lIcon}`} />
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
          Name is required
        </p>
      )}
    </div>
  );
};
