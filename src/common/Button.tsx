import React from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  isLoading?: boolean;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({
  label,
  isLoading = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={classNames('button', { 'is-loading': isLoading })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
