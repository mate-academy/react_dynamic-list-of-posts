import PropTypes from 'prop-types';

export const CommentsProps = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  removeComment: PropTypes.func.isRequired,
};
