import PropTypes from 'prop-types';

export const ProstProps = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  postId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  setPostId: PropTypes.func.isRequired,
};
