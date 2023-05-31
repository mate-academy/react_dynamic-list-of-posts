import classNames from 'classnames';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  loading,
  dataCy,
  className,
  disabled = false,
  children,
  onClick,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    data-cy={dataCy}
    className={classNames(
      'button is-link',
      className,
      { 'is-loading': loading },
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
