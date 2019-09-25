import PropTypes from 'prop-types';

const UserAdressShape = {
  city: PropTypes.string,
  street: PropTypes.string,
  zipcode: PropTypes.string,
};

const UserShape = {
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.shape(UserAdressShape),
};

export const UserProps = {
  user: PropTypes.shape(UserShape),
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
  comments: PropTypes.arrayOf(PropTypes.shape(CommentShape)).isRequired,
};

const PostShape = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export const PostProps = {
  post: PropTypes.shape(PostShape).isRequired,
  user: PropTypes.shape(UserShape),
  comments: PropTypes.arrayOf(PropTypes.shape(CommentShape)).isRequired,
};

export const PostListProps = {
  posts: PropTypes.arrayOf(PropTypes.shape(PostShape)).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(CommentShape)).isRequired,
};
