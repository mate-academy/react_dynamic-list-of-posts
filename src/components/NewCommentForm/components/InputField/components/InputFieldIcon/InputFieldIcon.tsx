import { FC } from 'react';
import { InputFieldIconProps } from '../../../../../../types';

export const InputFieldIcon: FC<InputFieldIconProps> = ({ icon }) => (
  <span className="icon is-small is-left">
    <i className={`fas fa-${icon}`} />
  </span>
);
