import React, { FC } from 'react';

interface Props {
  value: string;
  onChange: (event: { target: HTMLInputElement }) => void;
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
