import React, { FC } from 'react';

interface Props {
  handleChange(value: string): void;
}

export const FilterField: FC<Props> = ({ handleChange }) => (
  <div>
    <label htmlFor="filterField">
      Filter by title and body
    </label>
    <input
      type="text"
      id="filterField"
      className="validate"
      placeholder="Input here..."
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
        handleChange(event.target.value)
      )}
    />
  </div>
);
