import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => (
  posts.map(post => (
    <section className="post_list">
      <Post currentPost={post} key={post.id} />
    </section>
  ))
);

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.object).isRequired };

export default PostList;
