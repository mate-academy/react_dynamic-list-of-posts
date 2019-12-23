import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentsList from './CommentList';

function Post({ postData }) {
  return (
    <div className="post__block">
      <User author={postData.author} />
      <h2>{postData.title}</h2>
      <p>{postData.body}</p>
      <div className="post__block-comments-counter">
        {`Comments: ${postData.postComments.length}`}
      </div>
      <CommentsList comments={postData.postComments} />
    </div>
  );
}

Post.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    postComments: PropTypes.object,
  }).isRequired,
};

export default Post;
