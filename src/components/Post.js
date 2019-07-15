import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showListComments: false,
    };
  }

  showComments = () => {
    this.setState(prev => ({
      showListComments: !prev.showListComments,
    }));
  };

  render() {
    const { post } = this.props;
    return (
      <div className="post">
        <h2 className="post__title">{post.title}</h2>
        <p className="post__body">
          {post.body}
        </p>
        <User user={post.user} />
        <button
          type="button"
          className="post__comment_btn"
          onClick={this.showComments}
        >
          Comments
        </button>
        {this.state.showListComments
          ? <CommentList comments={post.comments} />
          : null}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Post;
