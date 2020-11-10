import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
}).isRequired;
