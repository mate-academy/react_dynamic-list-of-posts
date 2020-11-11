import PropTypes from 'prop-types';

export const ProstsListProps = {
  userId: PropTypes.number.isRequired,
  postId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  setPostId: PropTypes.func.isRequired,
};
