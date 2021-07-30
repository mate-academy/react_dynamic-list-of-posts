import PropTypes from 'prop-types';

export const postType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}).isRequired;
