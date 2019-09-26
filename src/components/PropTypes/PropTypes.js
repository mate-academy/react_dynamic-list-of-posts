import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  adress: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
    geo: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
  }),
  compane: PropTypes.shape({
    name: PropTypes.string,
    catchPhrase: PropTypes.string,
    bs: PropTypes.string,
  }),
});

const PostListShape = PropTypes.shape({
  userid: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
});

const CommentListShape = PropTypes.shape({
  postId: PropTypes.number,
  id: PropTypes.number,
  email: PropTypes.string,
  body: PropTypes.string,
  title: PropTypes.string,
});

export const PostListProps = {
  posts: PropTypes.arrayOf(PropTypes.shape(PostListShape)).isRequired,
};

export const PostProps = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    email: PropTypes.string,
    user: PropTypes.shape(userShape),
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape(CommentListShape),
  ).isRequired,
};

export const CommentProps = {
  comment: PropTypes.string,
  email: PropTypes.string,
};

export const CommentListProps = {
  commentsList: PropTypes.arrayOf(
    PropTypes.shape(CommentListShape)
  ).isRequired,
};
