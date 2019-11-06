import React from 'react';

function Load({ showList }) {
  return (
    <button onClick={showList} type="submit" className="ui blue button start">
      Load
    </button>
  );
}

export default Load;
