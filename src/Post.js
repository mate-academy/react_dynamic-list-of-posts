import React from 'react';
import PropsTypes from 'prop-types';

const Post = ({ postContent }) => (
  <>
    <h1 className="post__title">{postContent.title}</h1>
    <p className="post__body">{postContent.body}</p>
  </>
);

Post.propTypes = { postContent: PropsTypes.objectOf.isRequired };

export default Post;
