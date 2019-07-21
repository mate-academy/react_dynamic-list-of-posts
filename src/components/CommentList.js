import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentList extends React.Component {
  state = {
    on: false,
  };

  getLoad = () => {
    this.setState(prevState => ({
      on: !prevState.on,
    }));
  };

  render() {
    const { currentComments } = this.props;
    const result = currentComments.map(comment => (
      <Comment currentComment={comment} />
    ));

    return (
      <div>
        {this.state.on && result}

        <button
          type="submit"
          className="btn btn-success mt-2 mb-2"
          onClick={this.getLoad}
        >
          {this.state.on ? 'Hide' : 'Show' }
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
