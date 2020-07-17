import React, { FC, useState } from 'react';

interface Props {
  onFilterList: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: FC<Props> = (props) => {
  const [searchPhrace, setValue] = useState<string>('');

  const onSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setValue(value);
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Find post"
        value={searchPhrace}
        onChange={(event) => {
          onSetValue(event);
          props.onFilterList(event);
        }}
      />
    </div>
  );
};
