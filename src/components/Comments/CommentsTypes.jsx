import PropTypes from 'prop-types';

export const CommentsTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
  setComments: PropTypes.func,
};
