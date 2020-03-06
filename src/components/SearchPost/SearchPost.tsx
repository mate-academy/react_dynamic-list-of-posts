import React, { FC } from 'react';

import './SearchPost.css';

interface Props {
  filtered: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPost: string
}

export const SearchPost: FC<Props> = ({ filtered, searchPost }) => (
  <>
    <label htmlFor="search-query" className="label">
      Search Post
    </label>
    <input
      type="text"
      id="search-query"
      className="search_input"
      placeholder="Type search word"
      value={searchPost}
      onChange={filtered}
    />
  </>
);
