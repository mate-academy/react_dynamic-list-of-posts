import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentList extends React.Component {
  state = {
    isHidden: true,
  }

  showComments = () => {
    this.setState(prevState => ({
      isHidden: !prevState.isHidden,
    }));
  };

  render() {
    return (
      <div className="CommentList__items">
        <button type="button" onClick={this.showComments}>
          {this.state.isHidden ? 'Show Comment' : 'Hide comments'}
        </button>
        {this.state.isHidden
          ? <span> </span>
          : this.props.comments.map(comment => (
            <Comment comment={comment} />
          ))}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    body: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};

export default CommentList;
