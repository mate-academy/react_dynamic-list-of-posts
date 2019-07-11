import React from 'react';
import PropTypes from 'prop-types';

import './CommentsList.css';
import CommentItem from '../CommentItem/CommentItem';

class CommentsList extends React.Component {
  state = {
    commentsAreVisible: false,
  };

  togleComments() {
    this.setState(prevState => ({ commentsAreVisible: !prevState.commentsAreVisible }));
  }

  render() {
    const { comments } = this.props;
    const { commentsAreVisible } = this.state;
    return (
      <div>
        {
          <button
            className="show-comments-btn"
            onClick={() => { this.togleComments(true); }}
          >
            {
              commentsAreVisible
                ? 'Скрыть комментарии'
                : 'Показать комментарии'
            }
          </button>
        }
        {
          commentsAreVisible && (
            <div className="comments">
              {
                comments.map(comment => (
                  <CommentItem comment={comment} key={comment.id} />
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.object.isRequired,
};

export default CommentsList;
