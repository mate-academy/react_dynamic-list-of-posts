import classNames from 'classnames';
import React from 'react';

type Props = {
  textArea?: boolean,
  children?: React.ReactNode;
  label: string,
  name: string,
  id: string,
  dataCy: string;
  placeholder: string,
  errorMessage: string,
  value: string,
  onChange: (newValue: string) => void;
  hasError: boolean;
  onError: (hasError: boolean) => void;
};

export const TextField: React.FC<Props> = ({
  textArea = false,
  children,
  label,
  name,
  id,
  dataCy,
  placeholder,
  errorMessage,
  value,
  onChange,
  hasError,
  onError,
}) => {
  return (
    <div className="field" data-cy={dataCy}>
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div
        className={classNames(
          'control',
          {
            'has-icons-left': !textArea,
            'has-icons-right': !textArea,
          },
        )}
      >
        {!textArea
          ? (
            <input
              type="text"
              name={name}
              id={id}
              placeholder={placeholder}
              className={classNames(
                'input',
                {
                  'is-danger': hasError,
                },
              )}
              value={value}
              onChange={(changeEvent) => {
                onError(false);
                onChange(changeEvent.target.value);
              }}
            />
          ) : (
            <textarea
              id={id}
              name={name}
              placeholder={placeholder}
              className={classNames(
                'textarea',
                {
                  'is-danger': hasError,
                },
              )}
              value={value}
              onChange={(changeEvent) => {
                onError(false);
                onChange(changeEvent.target.value);
              }}
            />
          )}

        {!textArea && (
          <>
            {children}

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
