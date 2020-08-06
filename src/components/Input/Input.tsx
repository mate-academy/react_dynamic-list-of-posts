import React, { FC } from 'react';
import { OnChangeCallback } from '../../interfaces';

interface Props {
  value: string;
  onChange: OnChangeCallback;
}

export const Input: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="form-control"
      placeholder="Filter posts by title or body"
    />
  );
};
