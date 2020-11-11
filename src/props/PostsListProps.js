import PropTypes from 'prop-types';

export const ProstsListProps = {
  userId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};
