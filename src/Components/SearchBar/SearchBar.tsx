import React, { FC } from 'react';

interface SearchBarProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onChange }) => (
  <div className="box">
    <div className="field">
      <label htmlFor="search-query" className="label">
        Search post
      </label>

      <div className="control">
        <input
          type="text"
          id="search-query"
          className="input"
          placeholder="Type search word"
          onChange={onChange}
        />
      </div>
    </div>
  </div>
);
