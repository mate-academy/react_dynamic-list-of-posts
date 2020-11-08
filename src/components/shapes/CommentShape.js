import PropTypes from 'prop-types';

export const CommentShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
