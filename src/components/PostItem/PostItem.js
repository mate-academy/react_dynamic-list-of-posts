import React from 'react';
import PropTypes from 'prop-types';

import './PostItem.css';
import CommentList from '../CommentsList/CommentsList';
import User from "../User/User";

class PostItem extends React.Component {

  render() {
    const { postItem, postAuthor, postComments } = this.props.post;
    return (
      <div className="post__container">
        <article className="post">
          <h2 className="post__title">{postItem.title}</h2>
          <p>{postItem.body}</p>

          <User user={postAuthor} />

        </article>
        <CommentList comments={postComments} />
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostItem;
