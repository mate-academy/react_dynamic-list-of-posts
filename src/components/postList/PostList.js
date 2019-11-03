import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Post from '../post/Post';

const PostList = ({ posts }) => (
  <Message>
    {posts.map(post => (<Post post={post} key={post.id} />))}
  </Message>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
