import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PostContent.css';
import ToggleCommentsButton from './ToggleCommentsButton';
import CommentList from './CommentList/CommentList';

class PostContent extends Component {
  state = {
    areDisplayed: false,
  };

  toggleComments = () => {
    this.setState(prevState => ({
      areDisplayed: !prevState.areDisplayed,
    }));
  }

  render() {
    const { areDisplayed } = this.state;
    const { post } = this.props;
    return (
      <div className="post-section">
        <h2 className="post-user">
          {post.user.name}
        </h2>

        {post.body}

        <ToggleCommentsButton
          toggle={this.toggleComments}
          displayed={areDisplayed}
        />

        {!areDisplayed || <CommentList comments={post.comments} />}
      </div>
    );
  }
}

PostContent.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
};

export default PostContent;
