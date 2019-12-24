import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function PostList(props) {
  return (
    props.posts.map(item => <Post post={item} key={item.id} />)
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
