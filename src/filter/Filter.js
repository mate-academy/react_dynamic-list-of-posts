import React from 'react';
import './Filter.css';

const Filter = ({ onFilter, showAll }) => {
  return (
    <form 
      className="filter" 
      onSubmit={(event) => {
        onFilter(event.target.filterInput.value);
        event.target.filterInput.value = '';
        event.preventDefault();
      }}
    >
      <div className="block">
        <input 
          className="filter-input" 
          type="text" 
          name="filterInput" />
        <label className="filter-label">Find post by text</label>
        <button 
          type="button"
          className="show-all-button"
          onClick={showAll}
        >
          Show all
        </button>
      </div>
      
    </form>
  );
};

export default Filter;
