import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => (
  <div className="postList">
    {posts.map(postItem => (<Post post={postItem} key={postItem.id} />
    ))}
  </div>
);

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.object).isRequired };

export default PostList;
