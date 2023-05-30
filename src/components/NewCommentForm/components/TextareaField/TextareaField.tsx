import classNames from 'classnames';
import { FieldError } from '../FieldError';
import { TextareaFieldProps } from '../../../../types';

export const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  name,
  value,
  hasError,
  labelText,
  placeholder,
  onChange,
}) => (
  <div className="field" data-cy={`${name}Field`}>
    <label className="label" htmlFor={id}>
      {labelText}
    </label>

    <div className="control">
      <textarea
        id={id}
        value={value}
        name={name.toLowerCase()}
        placeholder={placeholder}
        className={classNames('textarea', { 'is-danger': hasError })}
        onChange={(e) => onChange(name.toLowerCase(), e.target.value)}
      />
    </div>

    <FieldError name={name} hasError={hasError} />
  </div>
);
