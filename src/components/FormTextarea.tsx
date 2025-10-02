import classNames from 'classnames';

type Props = {
  label: string;
  id: string;
  name: string;
  data: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export const FormTextarea: React.FC<Props> = ({
  label,
  id,
  name,
  data,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="field" data-cy={data}>
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className={classNames('textarea', { 'is-danger': error })}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>

      {error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      )}
    </div>
  );
};
