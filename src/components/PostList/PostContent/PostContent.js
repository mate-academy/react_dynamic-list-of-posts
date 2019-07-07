import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PostContent.css';
import CommentList from './CommentList/CommentList';

class PostContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      displayComments: false,
    };
  }

  showComments = () => {
    this.setState(state => ({
      displayComments: !state.displayComments,
    }));
  }

  render() {
    return (
      <div className="post-section">
        <h2 className="post-user">
          {this.state.post.user.name}
        </h2>

        {
          this.state.post.body
        }

        {
          this.state.displayComments
            ? (
              <CommentList
                comments={this.state.post.comments}
                hideFunction={this.showComments}
              />
            )
            : (
              <div
                role="button"
                tabIndex={0}
                className="post-action"
                onKeyUp={() => {}}
                onClick={this.showComments}
              >
                Show comments
              </div>
            )
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
