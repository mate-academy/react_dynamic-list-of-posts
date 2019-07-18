import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts, getFilterPosts }) => (
  <div>
    <form>
      <input
        onChange={getFilterPosts}
        className="input-filter_name"
        type="text"
        placeholder="Enter the search parameters"
      />
    </form>
    <ul className="post-field">
      {posts.map(item => (
        <li className="post_section">
          <div className="user-post">
            <Post postItem={item} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFilterPosts: PropTypes.func.isRequired,
};

export default PostList;
