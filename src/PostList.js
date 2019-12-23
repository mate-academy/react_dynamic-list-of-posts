import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => (
  <section className="post-list">
    { posts.map(post => (
      <div key={post.id} className="allPost">
        <Post ownpost={post} />
      </div>
    ))}
  </section>
);

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.any).isRequired };

export default PostList;
