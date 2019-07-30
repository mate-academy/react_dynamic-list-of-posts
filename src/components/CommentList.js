import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

class CommentList extends React.Component {
  state = {
    open: false,
  }

  showComments = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <>
        <button
          type="button"
          onClick={event => this.showComments(event)}
        >
          Show comments
        </button>
        <div className={`comments ${this.state.open ? 'show' : ''}`}>
          {this.props.commentList.map(comments => (
            <Comment comments={comments} key={comments.id} />
          ))}
        </div>
      </>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  commentList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
