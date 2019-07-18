import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

class CommentList extends React.Component {
  state = {
    isLoadedComment: 1,
  }

  /* eslint-disable */
  getShowComment = () => {
    this.setState({
      isLoadedComment: this.state.isLoadedComment * (-1),
    });
  }
  /* eslint-enable */

  render() {
    const { listItems } = this.props;
    const { isLoadedComment } = this.state;

    return (
      <div>
        <button
          onClick={this.getShowComment}
          type="button"
          className="btn btn-outline-dark btn-sm"
        >
          Comments
        </button>
        {isLoadedComment === 1
          ? ([])
          : (listItems.comments.map(item => <Comment commentItem={item} />))}
      </div>
    );
  }
}

CommentList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
