import PropTypes from 'prop-types';

export const PostType = {
  userId: PropTypes.number,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
};
