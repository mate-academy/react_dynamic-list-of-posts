import React from 'react';
import './Filter.css';

const Filter = ({ onFilter }) => {
  return (
    <form 
      className="filter" 
      onSubmit={(event) => {
        onFilter(event.target.filterInput.value);
        event.target.filterInput.value = '';
        event.preventDefault();
      }}
    >
      <input 
        className="filter-input" 
        type="text" 
        name="filterInput" />
      <label className="filter-label">Find post by text</label>
    </form>
  );
};

export default Filter;
