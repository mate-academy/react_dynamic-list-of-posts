import PropTypes from 'prop-types';

export const ProstProps = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};
