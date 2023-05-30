import { FieldErrorProps } from '../../../../types';

export const FieldError: React.FC<FieldErrorProps> = ({
  name,
  hasIcon,
  hasError,
}) => {
  if (!hasError) {
    return null;
  }

  return (
    <>
      {hasIcon && (
        <span
          className="icon is-small is-right has-text-danger"
          data-cy="ErrorIcon"
        >
          <i className="fas fa-exclamation-triangle" />
        </span>
      )}
      <p className="help is-danger" data-cy="ErrorMessage">
        {name === 'Body' ? 'Enter some text' : `${name} is required`}
      </p>
    </>
  );
};
