import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import CommentList from './CommentList';

class Post extends React.Component {
  state = {
    isVisible: false,
  }

  toggleComments = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible,
    }));
  }

  render() {
    const { post } = this.props;
    const { isVisible } = this.state;

    return (
      <article className="post">
        <h2 className="post__title">{ post.title }</h2>

        <User user={post.user} />

        <p className="post__text">{post.body}</p>

        { isVisible ? (
          <>
            <CommentList
              comments={post.comments}
            />
            <button
              type="button"
              onClick={this.toggleComments}
              className="comment-btn"
            >
              Hide comments
            </button>
          </>

        ) : (
          <button
            type="button"
            onClick={this.toggleComments}
            className="comment-btn"
          >
            {`Show comments (${post.comments.length})`}
          </button>
        )
        }
      </article>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
  }).isRequired,
};

export default Post;
