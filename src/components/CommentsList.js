import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';
import './CommentsList.css';

class CommentsList extends React.Component {
  state = {
    commentLoaded: false,
  }

  handleShowComments = () => {
    this.setState(prevState => ({
      commentLoaded: !prevState.commentLoaded,
    }));
  }

  render() {
    const { comments } = this.props;

    const postComment = this.state.commentLoaded
      && comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ));

    return (
      <div className="post__comment-list">
        <div className="post__comment-list-header">
          <h4>Comments</h4>
          <button
            type="button"
            name="isLoadComments"
            className="comments_button"
            onClick={this.handleShowComments}
          >
            Show Comments
          </button>
        </div>

        {postComment}
      </div>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default CommentsList;
