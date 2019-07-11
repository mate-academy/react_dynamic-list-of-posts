import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PostContent.css';
import ToggleCommentsButton from './ToggleCommentsButton';
import CommentList from './CommentList/CommentList';

class PostContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      displayedComments: false,
    };
  }

  toggleComments = () => {
    this.setState(prevState => ({
      displayedComments: !prevState.displayedComments,
    }));
  }

  render() {
    const { post, displayedComments } = this.state;
    return (
      <div className="post-section">
        <h2 className="post-user">
          {
            post.user.name
          }
        </h2>

        {
          post.body
        }

        <ToggleCommentsButton
          toggle={this.toggleComments}
          displayed={displayedComments}
        />

        {
          !displayedComments || <CommentList comments={post.comments} />
        }
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
  }).isRequired,
};

export default PostContent;
