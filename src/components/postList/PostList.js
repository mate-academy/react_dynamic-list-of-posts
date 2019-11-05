import React from 'react';
import { Message, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Post from '../post/Post';

const PostList = ({ posts, search }) => (
  <>
    <Input
      type="text"
      name="text-area"
      placeholder="Enter Search"
      onChange={search}
    />
    <Message>
      {posts.map(post => (<Post post={post} key={post.id} />))}
    </Message>
  </>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.func.isRequired,
};

export default PostList;
