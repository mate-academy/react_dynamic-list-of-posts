import PropTypes from 'prop-types';

export const CommentProps = {
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeComment: PropTypes.func.isRequired,
};
