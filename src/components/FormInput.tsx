import classNames from 'classnames';

type Props = {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  leftIcon?: string;
};

export const FormInput: React.FC<Props> = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  leftIcon,
}) => {
  return (
    <div className="field" data-cy={`${label}Field`}>
      <label className="label" htmlFor={id}>
        Author {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className={classNames('input', { 'is-danger': error })}
          value={value}
          onChange={e => onChange(e.target.value)}
        />

        <span className="icon is-small is-left">
          <i className={classNames(`fas ${leftIcon}`)} />
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
          {label} is required
        </p>
      )}
    </div>
  );
};
