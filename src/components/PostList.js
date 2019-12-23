import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div className="post__item">
      {posts.map(post => <Post postInfo={post} key={post.id} />)}
    </div>
  );
}

// eslint-disable-next-line max-len
PostList.propTypes = { posts: PropTypes.shape({ post: PropTypes.arrayOf(PropTypes.object) }).isRequired };

export default PostList;
