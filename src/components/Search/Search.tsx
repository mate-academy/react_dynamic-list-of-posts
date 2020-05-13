import React from 'react';
import { debounce } from '../../helpers';

type Props = {
  setSearchQuery: (query: string) => void;
};

export const Search: React.FC<Props> = ({ setSearchQuery }) => {
  const debouncedSetSearchQuery = debounce((value: string) => setSearchQuery(value), 1000);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    debouncedSetSearchQuery(value);
  };

  return (
    <div className="field">
      <div className="control">
        <input
          className="input is-primary"
          type="text"
          placeholder="Input text"
          onChange={e => {
            handleInputChange(e);
          }}
        />
      </div>
    </div>
  );
};
