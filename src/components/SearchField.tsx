import React, { FC } from 'react';

interface Props {
  setValue(event: React.ChangeEvent<HTMLInputElement>): void;
  searchingValue: string;
}


export const SearchField: FC<Props> = ({ setValue, searchingValue }) => {
  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="search">
          Search post by title or by description
          <input
            type="text"
            className="form-control"
            value={searchingValue}
            onChange={setValue}
            id="search"
            placeholder="put someth.."
          />
        </label>
      </div>
    </form>
  );
};
