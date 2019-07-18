import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import Post from './Post';
import CommentList from './CommentList';

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
            <User userItem={item} />
          </div>
          <p className="comment_tab">
            <CommentList listItems={item} />
          </p>
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
