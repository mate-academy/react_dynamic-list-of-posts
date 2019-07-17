import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import CommentList from './CommentList';
import { getComments } from '../api/getData';

class Post extends React.Component {
  state = {
    isVisible: false,
    comments: [],
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const comments = await getComments();

    this.setState({
      comments,
    });
  };

  showComments = () => {
    this.setState({
      isVisible: true,
    });
  }

  hideComments = () => {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const { post } = this.props;
    const { isVisible, comments } = this.state;

    return (
      <article className="post">
        <h2 className="post__title">{ post.title }</h2>

        <User user={post.user} />

        <p className="post__text">{post.body}</p>

        { isVisible ? (
          <>
            <CommentList
              post={post}
              comments={comments}
            />
            <button
              type="button"
              onClick={this.hideComments}
              className="comment-btn"
            >
              Hide comments
            </button>
          </>

        ) : (
          <button
            type="button"
            onClick={this.showComments}
            className="comment-btn"
          >
            Show comments
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
  }).isRequired,
};

export default Post;
