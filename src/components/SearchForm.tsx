import React from 'react';

type SearchFormProps = {
  inputValue: string;
  handleChangeInput: React.ChangeEventHandler<HTMLInputElement>;
};

export const SearchForm: React.FC<SearchFormProps> = ({ handleChangeInput, inputValue }) => {
  return (
    <div className="input-field">
      <i className="material-icons">search</i>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleChangeInput(e)}
        required
      />
    </div>
  );
};
