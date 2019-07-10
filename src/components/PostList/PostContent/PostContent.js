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

  toggleComments = () => {
    this.setState(state => ({
      displayComments: !state.displayComments,
    }));
  }

  render() {
    const { comments } = this.state.post;
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
                comments={comments}
                hideFunction={this.toggleComments}
              />
            ) : (
              <div
                role="button"
                tabIndex={0}
                className="post-action"
                onKeyUp={() => {}}
                onClick={this.toggleComments}
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
