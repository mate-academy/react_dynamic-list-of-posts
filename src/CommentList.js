import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentList extends React.Component {
  state = {
    isLoaded: false,
    isLoading: false,
  }

  handleClickHide = () => {
    this.setState({
      isLoading: false,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: false,
        isLoading: true,
      });
    }, 10);
  };

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 10);
  }

  render() {
    return (
      <div className="App__comment_list">
        { this.state.isLoaded
          ? (
            <div>
              <button
                type="button"
                onClick={this.handleClickHide}
              >
                { this.state.isLoading ? 'Loading' : 'Hide Comment' }
              </button>
              {this.props.preparedComment.map(comment => (
                <Comment preparedComment={comment} key={comment.id} />
              ))}
            </div>
          )
          : (
            <button
              type="button"
              onClick={this.handleClick}
            >
              { this.state.isLoading ? 'Comment' : 'Comment' }
            </button>
          )
        }
      </div>
    );
  }
}

CommentList.propTypes = {
  preparedComment: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
};

export default CommentList;
