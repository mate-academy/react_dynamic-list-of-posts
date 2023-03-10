import classNames from 'classnames';
import { Valid } from '../types/Valid';

type Props = {
  value: string,
  setValue: (val: string) => void,
  error: boolean,
  textError: string,
  title: string,
  ValidationFields: Valid,
  setValidFormFields: (obj: Valid) => void
  type: string,
  placeholder: string
};

export const Field: React.FC<Props> = ({
  value,
  setValue,
  error,
  textError,
  title,
  ValidationFields,
  setValidFormFields,
  type,
  placeholder,
}) => {
  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.target.value);
    const array = Object.entries(ValidationFields);

    const result = array.map((el) => (el[0] === type ? [type, true] : el));

    setValidFormFields(Object.fromEntries(result) as Valid);
  };

  return (
    <div className="field" data-cy="NameField">
      <label className="label" htmlFor="comment-author-name">
        {title}
      </label>

      {type === 'text' ? (
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder={placeholder}
            className={classNames('textarea', {
              'is-danger': !error,
            })}
            value={value}
            onChange={changeHandler}
          />
        </div>
      ) : (
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder={placeholder}
            className={classNames('input', {
              'is-danger': !error,
            })}
            value={value}
            onChange={changeHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
      )}

      {!error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {textError}
        </p>
      )}
    </div>
  );
};
