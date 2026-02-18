import React from 'react';

type Props = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  className: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  type,
  name,
  id,
  placeholder,
  className,
  value,
  handleChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={handleChange}
    />
  );
};
