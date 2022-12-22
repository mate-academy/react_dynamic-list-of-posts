import { FC } from 'react';

export const ErrorTriangle: FC = () => {
  return (
    <span
      className="icon is-small is-right has-text-danger"
      data-cy="ErrorIcon"
    >
      <i className="fas fa-exclamation-triangle" />
    </span>
  );
};
