import React from 'react';

interface FilterProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Filter = ({ handleSearch, value }: FilterProps) => (
  <div className="form-group">
    <input
      onChange={handleSearch}
      value={value}
      className="form-control form-control-lg"
      type="text"
      placeholder="Find post..."
    />
  </div>
);
