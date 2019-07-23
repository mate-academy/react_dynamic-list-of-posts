import React from 'react';
import propTypes from 'prop-types';

const FilterPosts = ({ filterStr, onHandlerChange, clearFilter }) => (
  <div className="post-list__searching">
    <input
      className="post-list__filter"
      type="text"
      placeholder="Search post"
      value={filterStr}
      onChange={onHandlerChange}
    />
    <button
      className={filterStr
        ? 'search-post__clear'
        : 'invisible'
      }
      onClick={clearFilter}
      type="button"
    >
      X
    </button>
  </div>
);

FilterPosts.propTypes = {
  filterStr: propTypes.string.isRequired,
  onHandlerChange: propTypes.func.isRequired,
  clearFilter: propTypes.func.isRequired,
};

export default FilterPosts;
