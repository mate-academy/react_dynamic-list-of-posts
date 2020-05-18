import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import { debounce } from '../helpers/debounce';

type PropsSearch = {
  setSearchQuery: (query: string) => void;
};

const Search: React.FC<PropsSearch> = ({ setSearchQuery }) => {
  const debouncedSearch = debounce(
    (value: string) => setSearchQuery(value), 1000,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().slice(0, 30);

    debouncedSearch(value);
  };

  return (
    <div className="field">
      <Input
        className="field__search"
        placeholder="Search..."
        size="big"
        icon
      >
        <input onChange={event => handleInputChange(event)} />
        <Icon name="search" />
      </Input>
    </div>
  );
};

export default Search;
