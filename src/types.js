import PropTypes from 'prop-types';

export const TypePost = PropTypes.shape({
  comments: PropTypes.array,
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.number,
  userId: PropTypes.number,
});
