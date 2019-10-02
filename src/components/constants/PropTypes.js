import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  adress: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
}).isRequired;

const commentShape = PropTypes.shape({
  body: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
}).isRequired;

export const UserProps = {
  user: PropTypes.shape(userShape),
};

export const PostListProps = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export const PostProps = {
  post: PropTypes.shape({
    user: PropTypes.shape(userShape).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape(commentShape).isRequired,
    ).isRequired,
  }).isRequired,
};

export const CommentListProps = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      body: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export const CommentProps = {
  comment: PropTypes.shape(commentShape).isRequired,
};
