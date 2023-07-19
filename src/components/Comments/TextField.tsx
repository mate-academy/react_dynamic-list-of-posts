import {
  FC, ChangeEvent, useState, useEffect,
} from 'react';
import classNames from 'classnames';
import { FieldIcon, Field } from '../../types';

type Props = {
  field: Field;
  type: 'text' | 'textarea';
  id: string;
  label: string;
  placeholder: string;
  name: 'name' | 'email' | 'body';
  icon?: FieldIcon;
  isErrorIcon?: boolean;
  errorMessage: string;
  isSubmitted: boolean;
  isReseted: boolean;
  value: string;
  onChange: (value: string) => void;
  setIsSubmitted: (value: boolean) => void;
};

export const TextField: FC<Props> = (props) => {
  const {
    field,
    type,
    id,
    label,
    placeholder,
    name,
    icon,
    isErrorIcon,
    errorMessage,
    value,
    isSubmitted,
    isReseted,
    setIsSubmitted,
    onChange,
  } = props;

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setIsError(!value);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (isReseted) {
      setIsError(false);
      onChange('');
    }
  }, [isReseted]);

  const handleChangeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsError(false);
    onChange(event.target.value);
  };

  return (
    <div className="field" data-cy={field}>
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div
        className={classNames('control', {
          'has-icons-left has-icons-right': type === 'text',
        })}
      >
        {type === 'text' ? (
          <input
            type={type}
            value={value}
            name={name}
            id={id}
            placeholder={placeholder}
            className={classNames({
              input: type === 'text',
              'is-danger': isError,
            })}
            onChange={handleChangeValue}
          />
        ) : (
          <textarea
            value={value}
            id={id}
            name={name}
            placeholder={placeholder}
            className={classNames({
              textarea: type === 'textarea',
              'is-danger': isError,
            })}
            onChange={handleChangeValue}
          />
        )}

        {icon && (
          <span className="icon is-small is-left">
            <i className={icon} />
          </span>
        )}

        {(isErrorIcon && isError) && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {isError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
