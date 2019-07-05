import React from "react";
import "../filter/Filter.css";

const Filter = props => {
  return (
    <div className="filter">
      <span>
        Find post by text: <input type="text" />
      </span>
    </div>
  );
};

export default Filter;
