import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';
import User from './User';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openComments: false,
    };
    this.openComments = this.openComments.bind(this);
  }

  openComments() {
    this.setState(prevState => ({ openComments: !prevState.openComments }));
  }

  render() {
    const {
      title, body, comments, user,
    } = this.props.post;
    const { openComments } = this.state;
    let commentsShow = '';

    if (openComments) {
      commentsShow = <Comments comments={comments} />;
    } else {
      commentsShow = (
        <button type="button" onClick={this.openComments}>
          Comments load
        </button>
      );
    }

    return (
      <div className="post">
        <div className="post__title">
          {
            title
          }
        </div>
        <div className="post__body">
          {
            body
          }
        </div>
        <User user={user} />
        {
          commentsShow
        }
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.instanceOf(Object).isRequired,
};

export default Post;
