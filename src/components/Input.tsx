import classNames from 'classnames';

type InputProps = {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  icon: string;
  errorMsg: string;
  isError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: string;
};

export const Input = ({
  label, id, icon, errorMsg, isError, data, ...attr
}: InputProps) => {
  return (
    <div className="field" data-cy={data}>
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type="text"
          {...attr}
          id={id}
          className={classNames('input', { 'is-danger': isError })}
        />

        <span className="icon is-small is-left">
          <i className={`fas ${icon}`} />
        </span>

        {isError && (
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
          {errorMsg}
        </p>
      )}
    </div>
  );
};
