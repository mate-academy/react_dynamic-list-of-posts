import classNames from 'classnames';

type Props = {
  name?: string;
  title?: string;
  errorMessage?: string;
  placeholder?: string;
  valid?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export const ValidatedTextarea = ({
  name,
  title,
  errorMessage,
  placeholder,
  valid,
  value,
  onChange,
  ...rest
}: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    return onChange && onChange(event.target.value);
  }

  return (
    <div className="field" {...rest}>
      {title && (
        <label className="label" htmlFor={name}>
          {title}
        </label>
      )}

      <div className="control">
        <textarea
          value={value}
          onChange={handleChange}
          id={name}
          name={name}
          placeholder={placeholder}
          className={classNames('textarea', { 'is-danger': !valid })}
        />
      </div>

      {!valid && errorMessage && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
