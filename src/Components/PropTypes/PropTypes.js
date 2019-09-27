import PropTypes from 'prop-types';

export const UserProps = {
  name: PropTypes.string,
  email: PropTypes.string,
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
};

export const CommentProps = {
  comment: PropTypes.string,
  email: PropTypes.string,
};

const commentShape = PropTypes.shape({
  postId: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  body: PropTypes.string,
});

export const CommentListProps = {
  commentsList: PropTypes.arrayOf(
    PropTypes.shape(commentShape),
  ),
};

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
  company: PropTypes.shape({
    name: PropTypes.string,
    catchPhrase: PropTypes.string,
    bs: PropTypes.string,
  }),
});

export const PostProps = {
  title: PropTypes.string,
  text: PropTypes.string,
  user: PropTypes.shape(userShape),
  id: PropTypes.number,
  commentList: PropTypes.arrayOf(
    PropTypes.shape(commentShape),
  ),
};

export const PostListProps = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape(userShape),
  })),
  commentList: PropTypes.arrayOf(
    PropTypes.shape(commentShape),
  ),
};

export const HeaderProps = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  })),
  users: PropTypes.arrayOf(PropTypes.shape(userShape)),
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)),
};
