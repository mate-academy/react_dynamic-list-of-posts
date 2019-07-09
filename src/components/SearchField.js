import React from 'react';
import PropTypes from 'prop-types';

const SearchField = ({ search, updateSearch }) => (
  <div className="search_list">
    <input
      className="search_field"
      type="text"
      value={search}
      onChange={updateSearch}
      placeholder="Search"
    />
  </div>
);

SearchField.propTypes = {
  updateSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchField;
