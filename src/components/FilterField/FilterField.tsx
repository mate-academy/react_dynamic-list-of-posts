import React, { FC } from 'react';

interface FilterFieldProps {
  handleChange(value: string): void;
}

export const FilterField: FC<FilterFieldProps> = ({ handleChange }) => (
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
