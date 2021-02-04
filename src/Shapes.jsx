import PropTypes from 'prop-types';

export const PostType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
}).isRequired;

export const PostListType = {
  posts: PropTypes.arrayOf(PostType),
  onPostSelected: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
