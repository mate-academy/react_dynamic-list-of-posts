import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentsList from './CommentList';

function Post({ postInfo }) {
  return (
    <div className="post__block">
      <User author={postInfo.author} />
      <h2>{postInfo.title}</h2>
      <p>{postInfo.body}</p>
      <div className="post__block-comments-counter">
        {`Comments: ${postInfo.postComments.length}`}
      </div>
      <CommentsList comments={postInfo.postComments} />
    </div>
  );
}

Post.propTypes = {
  postInfo: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    postComments: PropTypes.object,
  }).isRequired,
};

export default Post;
