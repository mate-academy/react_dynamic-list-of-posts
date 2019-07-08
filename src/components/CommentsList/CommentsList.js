import React from 'react';
import PropTypes from 'prop-types';

import './CommentsList.css';
import CommentItem from '../CommentItem/CommentItem';

class CommentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
    };
  }

  showComments() {
    this.setState(prevState => ({ showComments: !prevState.showComments }));
  }

  render() {
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
                this.props.comments.map(comment => <CommentItem comment={comment} />)
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
