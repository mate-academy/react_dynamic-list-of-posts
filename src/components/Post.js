import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

class Post extends React.Component {
  state = {
    showComment: false,
  }

  render() {
    const { post } = this.props;

    return (
      <li
        className="post_list"
      >
        <User userItem={post.user} />
        <p className="post_title">
          <b>Title</b>
          {' '}
          {post.title}
        </p>

        <p className="post_body">{post.body}</p>
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
          className="show_comments"
          onClick={() => this.setState(state => ({
            showComment: !state.showComment,
          }))}
        >
          <p className="view-comments">
            {this.state.showComment
              ? 'Hide comments'
              : 'View comments'}
          </p>
        </div>
        {
          this.state.showComment
            ? <CommentList comments={post.comments} />
            : ''
        }
      </li>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.string,
  }).isRequired,
};

export default Post;
