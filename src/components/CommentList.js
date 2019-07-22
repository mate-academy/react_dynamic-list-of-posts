import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentList extends React.Component {
  state = {
    show: false,
  };

  getLoad = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  render() {
    const { currentComments } = this.props;
    const result = currentComments.map(comment => (
      <Comment key={comment.id} currentComment={comment} />
    ));

    return (
      <div>
        {this.state.show && result}

        <button
          type="submit"
          className="btn btn-success mt-2 mb-2"
          onClick={this.getLoad}
        >
          {this.state.show ? 'Hide' : 'Show' }
        </button>
      </div>
    );
  }
}

CommentList.propTypes = {
  currentComments: PropTypes.shape({
    post: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentList;
