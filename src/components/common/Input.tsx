import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { IconsNames, InputTypes } from '../../libs/enums';

type InputType = InputTypes.Text | InputTypes.Email | InputTypes.Textarea;

type Props = {
  inputType?: InputType
  inputName: string,
  label: string,
  dataCy: string,
  id: string,
  placeholder?: string,
  iconName?: IconsNames,
  errorMessage: string,
  initialValue: string,
  onChangeValue: (name: string, value: string) => void;
};

export const Input: React.FC<Props> = ({
  inputType = 'text',
  inputName,
  label,
  dataCy,
  id,
  placeholder = '',
  iconName = IconsNames.User,
  errorMessage,
  initialValue,
  onChangeValue,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const hasError = !!errorMessage;
  const isTextarea = inputType === InputTypes.Textarea;

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;

    setValue(newValue);
    onChangeValue(inputName, newValue);
  };

  const attributes = {
    id,
    name: inputName,
    placeholder,
    className: classNames({
      input: !isTextarea,
      textarea: isTextarea,
      'is-danger': hasError,
    }),
  };

  return (
    <div className="field" data-cy={dataCy}>
      <label
        className="label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className={classNames('control', {
        'has-icons-left has-icons-right': !isTextarea,
      })}
      >
        {isTextarea ? (
          <textarea
            {...attributes}
            value={value}
            onChange={handleChangeValue}
          />
        ) : (
          <>
            <input
              {...attributes}
              type={inputType}
              value={value}
              onChange={handleChangeValue}
            />

            <span className="icon is-small is-left">
              <i className={classNames('fas', iconName)} />
            </span>

            {hasError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </>
        )}
      </div>

      {hasError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
