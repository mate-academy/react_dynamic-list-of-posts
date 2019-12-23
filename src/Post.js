import React from 'react';
import PropTypes from 'prop-types';
import Users from './Users';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <div className="onePost">
    <div className="content">
      <div className="header"><Users user={post.user} /></div>
      <div className="title">{post.title}</div>
      <div className="descrip"><CommentList comments={post.comment} /></div>
    </div>
    <div className="extra content">
      <span>
        <i aria-hidden="true" className="user icon" />
        {post.body}
      </span>
    </div>

  </div>

);

Post.propTypes = { post: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default Post;
