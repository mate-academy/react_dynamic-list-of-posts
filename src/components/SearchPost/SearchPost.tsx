import React, { FC } from 'react';

import './SearchPost.css';

interface Props {
  filtered: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string
}

export const SearchPost: FC<Props> = ({ filtered, searchValue }) => (
  <>
    <label htmlFor="search-query" className="label">
      Search Post
    </label>
    <input
      type="text"
      id="search-query"
      className="search_input"
      placeholder="Type search word"
      value={searchValue}
      onChange={filtered}
    />
  </>
);
