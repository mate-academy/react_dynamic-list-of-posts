import React from 'react';
import Comment from './Comment';
import './commentlist.css';

class CommentsList extends React.Component {
  state = {
    commentListIsOpen: false,
  }

  handleClick = () => {
    this.setState(prevState => ({
      commentListIsOpen: prevState.commentListIsOpen ? false : true,
    }));
  };

  render() {
    const { commentData } = this.props;
    return (
      <div>
        <button
          className="commentlist_load-buttom"
          type="button"
          onClick={this.handleClick}
        >
          {this.state.commentListIsOpen ? 'Hide comments' : 'Show comments'}
        </button>
        {this.state.commentListIsOpen
        && commentData.map(comment =>
        (
          <Comment
            commentData={comment}
            key={comment.id}
          />
        ))}
      </div>
    );

  }
}

export default CommentsList;
