import classNames from 'classnames';
import { FieldError } from '../FieldError';
import { InputFieldIcon } from './components/InputFieldIcon';
import { InputFieldProps } from '../../../../types';

export const InputField: React.FC<InputFieldProps> = ({
  id,
  icon,
  name,
  value,
  hasError,
  placeholder,
  onChange,
}) => (
  <div className="field" data-cy={`${name}Field`}>
    <label className="label" htmlFor={id}>
      {`Author ${name}`}
    </label>

    <div className="control has-icons-left has-icons-right">
      <input
        type="text"
        name={name.toLowerCase()}
        id={id}
        value={value}
        placeholder={placeholder}
        className={classNames('input', { 'is-danger': hasError })}
        onChange={(e) => onChange(name.toLowerCase(), e.target.value)}
      />

      <InputFieldIcon icon={icon} />

      <FieldError
        hasIcon
        name={name}
        hasError={hasError}
      />
    </div>
  </div>
);
