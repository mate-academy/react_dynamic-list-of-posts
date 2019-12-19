import PropTypes from 'prop-types';
import React from 'react';
import User from './User';
import CommentList from './CommentList';
import { getHighlightedText } from './highlight';

const Post
  = ({ post: { id, user, title, body, commentList }, highlightedPart }) => (
    <div className="post">
      <dt className="title">
        {`Post ${id}: `}
        {getHighlightedText(title, highlightedPart)}
      </dt>
      <dd className="description">
        <span className="post-body">
          {getHighlightedText(body, highlightedPart)}
        </span>
        <br />
        <span className="user-info">
          <User userObj={user} />
        </span>
        <CommentList
          comments={commentList}
        />
      </dd>
    </div>
  );

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({}).isRequired,
    commentList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  }).isRequired,
  highlightedPart: PropTypes.string.isRequired,
};

export default Post;
