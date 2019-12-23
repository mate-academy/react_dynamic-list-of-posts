import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function PostList({ postsListArr }) {
  return (
    <div className="post__item">
      {postsListArr.map(post => <Post postInfo={post} key={post.id} />)}
    </div>
  );
}

// eslint-disable-next-line max-len
PostList.propTypes = { postsListArr: PropTypes.shape({ post: PropTypes.arrayOf(PropTypes.object) }).isRequired };

export default PostList;
