import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import User from './User';
import CommentList from './CommentList';

const PostList = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id} className="comment-section">
        <div className="user-post">
          <Post postItem={item} />
          <User userItem={item} />
        </div>
        <CommentList listItems={item} />
      </li>
    ))}
  </ul>
);

PostList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
