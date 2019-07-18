import React from 'react';
import propTypes from 'prop-types';
import Post from './Post';

const PostsList = props => (
  <ul
    key="post_list"
    className="post_list"
  >
    {props.posts.map(currentPost => (
      <Post
        key={`post_${currentPost.id}`}
        postData={currentPost}
      />
    ))}
  </ul>
);

PostsList.propTypes = {
  posts: propTypes.arrayOf(propTypes.object).isRequired,
};

export default PostsList;
