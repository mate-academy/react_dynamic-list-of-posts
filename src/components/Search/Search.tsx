import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import { debounce } from '../../helpers';

type PropsSearch = {
  setSearchQuery: (query: string) => void;
};

export const Search: React.FC<PropsSearch> = ({ setSearchQuery }) => {
  const debouncedSearch = debounce(
    (value: string) => setSearchQuery(value), 1000,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().trim().slice(0, 20);

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
        <input onChange={handleInputChange} />
        <Icon name="search" />
      </Input>
    </div>
  );
};
