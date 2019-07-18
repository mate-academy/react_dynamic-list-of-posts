import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

class CommentList extends React.Component {
  state = {
    isToggleOn: true,
  }

  getShowComment = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    const { listItems } = this.props;
    const { isToggleOn } = this.state;

    return (
      <div>
        <button
          onClick={this.getShowComment}
          type="button"
          className="btn btn-outline-dark btn-sm"
        >
          Comments
        </button>
        {isToggleOn === true
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
