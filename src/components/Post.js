import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import CommentList from './CommentList';

class Post extends React.Component {
  state = {
    isCommentsLoaded: false,
  };

  handleClick = () => {
    this.setState(prev => ({
      isCommentsLoaded: !prev.isCommentsLoaded,
    }));
  };

  render() {
    const { currentPost } = this.props;
    const { isCommentsLoaded } = this.state;
    return (
      <div className="post-list_post">
        <h2 className="post-title">{currentPost.title}</h2>
        <div className="post-text">{currentPost.body}</div>
        <User userData={currentPost.user} />
        {
          isCommentsLoaded
          && <CommentList comments={currentPost.comments} />
        }
        <button type="button" onClick={this.handleClick}>
          { isCommentsLoaded ? 'Hide comments' : 'Load comments' }
        </button>
      </div>
    );
  }
}

Post.propTypes = {
  currentPost: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Post;
