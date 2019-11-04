import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts }) => (
  <table className="ui red table">
    <thead>
      <tr>
        <th>Title</th>
        <th>The text of the post</th>
        <th>Authors name</th>
        <th>post comments</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </tbody>
  </table>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
