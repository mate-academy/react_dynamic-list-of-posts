import React, { FC } from 'react';

interface Props {
  query: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<Props> = ({ query, handleSearch }) => (
  <>
    <input
      className="search"
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search..."
    />
  </>
);
