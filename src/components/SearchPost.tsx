import React, { FC } from 'react';

export const SearchPost: FC<SearchPost> = ({ onSearch, query }) => {
  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              value={query}
              className="materialize-textarea"
              onChange={(event) => onSearch(event)}
            />
            <label htmlFor="textarea1">Type something to search post...</label>
          </div>
        </div>
      </form>
    </div>
  );
};
