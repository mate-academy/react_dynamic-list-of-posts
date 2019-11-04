import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import '../App.css';

class CommentList extends React.Component {
  state = {
    isLoaded: false,
    isLoading: false,
  };

  handleClickHide = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleClick = () => {
    this.setState({
      isLoading: true,
    });
  };

  render() {
    return (
      <>
        { this.state.isLoaded
          ? (
            <div>
              <button
                className="btn"
                type="button"
                onClick={this.handleClickHide}
              >
                { this.state.isLoading ? 'Loading' : 'Hide Comments' }
              </button>
              {this.props.currentComment.map(comment => (
                <Comment dataComment={comment} key={comment.id} />
              ))}
            </div>
          )
          : (
            <button
              className="btn"
              type="button"
              onClick={this.handleClick}
            >
              { this.state.isLoading ? 'Comments' : 'Comments' }
            </button>
          )
        }
      </>
    );
  }
}

CommentList.propTypes = {
  currentComment: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
};

export default CommentList;
