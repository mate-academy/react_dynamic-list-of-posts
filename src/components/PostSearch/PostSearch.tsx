import React from 'react';

type Props = {
  handleSearchInput: (event: React.FormEvent<HTMLInputElement>) => void;
};

export const PostSearch: React.FC<Props> = ({ handleSearchInput }) => {
  return (
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        onChange={handleSearchInput}
      />
    </div>
  );
};
