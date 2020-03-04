import React, { FC, ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}


export const SearchBar: FC<Props> = props => {
  const { value, onChange } = props;

  return <input type="text" value={value} onChange={onChange} />;
};
