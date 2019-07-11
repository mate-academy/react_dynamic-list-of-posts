import React from 'react';
import PropTypes from 'prop-types';

const ToggleCommentsButton = ({ toggle, displayed }) => (
  <button
    type="button"
    className="post-action"
    onClick={toggle}
  >
    {
      displayed ? 'Show comments' : 'Hide comments'
    }
  </button>
);

ToggleCommentsButton.propTypes = {
  toggle: PropTypes.func.isRequired,
  displayed: PropTypes.bool.isRequired,
};

export default ToggleCommentsButton;
