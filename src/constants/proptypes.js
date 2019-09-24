import PropTypes from 'prop-types';

const UserShape = {
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
};

export const UserProps = {
  user: PropTypes.objectOf(UserShape),
};

const CommentShape = {
  name: PropTypes.string,
  body: PropTypes.string,
  email: PropTypes.string,
};

export const CommentProps = {
  comment: PropTypes.shape(CommentShape).isRequired,
};

export const CommentListProps = {
  comments: PropTypes.arrayOf(PropTypes.objectOf(CommentShape)).isRequired,
};

const PostShape = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export const PostProps = {
  post: PropTypes.shape(PostShape).isRequired,
  user: PropTypes.objectOf(UserShape),
  comments: PropTypes.arrayOf(PropTypes.objectOf(CommentShape)).isRequired,
};

export const PostListProps = {
  posts: PropTypes.arrayOf(PropTypes.objectOf(PostShape)).isRequired,
  users: PropTypes.arrayOf(PropTypes.objectOf(UserShape)).isRequired,
  comments: PropTypes.arrayOf(PropTypes.objectOf(CommentShape)).isRequired,
};
