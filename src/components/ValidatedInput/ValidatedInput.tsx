import classNames from 'classnames';

type Props = {
  name?: string;
  title?: string;
  errorMessage?: string;
  placeholder?: string;
  icon?: string;
  value?: string;
  onChange?: (value: string) => void;
  valid?: boolean;
};

export const ValidatedInput = ({
  name,
  title,
  errorMessage,
  placeholder,
  icon,
  valid,
  value,
  onChange,
  ...rest
}: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    return onChange && onChange(event.target.value);
  }

  return (
    <div className="field" {...rest}>
      {title && (
        <label className="label" htmlFor={name}>
          {title}
        </label>
      )}

      <div className="control has-icons-left has-icons-right">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          name={name}
          id={name}
          placeholder={placeholder}
          className={classNames('input', { 'is-danger': !valid })}
        />

        {icon && (
          <span className="icon is-small is-left">
            <i className={`fas ${icon}`} />
          </span>
        )}

        {!valid && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {!valid && errorMessage && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
