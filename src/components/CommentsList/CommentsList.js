import React from 'react';
import PropTypes from 'prop-types';

import './CommentsList.css';
import CommentItem from '../CommentItem/CommentItem';

class CommentsList extends React.Component {
  state = {
    showComments: false,
  };

  showComments() {
    this.setState(prevState => ({ showComments: !prevState.showComments }));
  }

  render() {
    const { comments } = this.props;
    return (
      <div>
        {
          <button className="show-comments-btn" onClick={() => { this.showComments(true); }}>
            {
              !this.state.showComments
                ? 'Показать комментарии'
                : 'Скрыть комментарии'
            }
          </button>
        }
        {
          this.state.showComments && (
            <div className="comments">
              {
                comments.map(comment => <CommentItem comment={comment} />)
              }
            </div>)
        }
      </div>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.object.isRequired,
};

export default CommentsList;
