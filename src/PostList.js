import React from 'react';
import PropsTypes from 'prop-types';
import Post from './Post';
import User from './User';
import Comments from './Comments';

const PostList = ({ posts }) => (
  posts.map(post => (
    <section className="post">
      <Post postContent={post} />
      <User
        person={post.user}
        address
      />
      <Comments postComments={post.comments} />
    </section>
  ))
);

PostList.propTypes = { posts: PropsTypes.arrayOf.isRequired };

export default PostList;
