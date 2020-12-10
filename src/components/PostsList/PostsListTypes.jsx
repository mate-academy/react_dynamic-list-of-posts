import PropTypes from 'prop-types';

export const PostsListTypes = {
  postsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      userId: PropTypes.number,
    }),
  ),
  selectedPostId: PropTypes.number,
  setSelectedPostId: PropTypes.func,
};
