import PropTypes from 'prop-types';

export const PostShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}).isRequired;
