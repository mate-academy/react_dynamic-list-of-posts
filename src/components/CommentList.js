import React from "react";
import '../App.css';
import Comment from './Comment'

class CommentList extends React.Component {
  state = {
    isShowingComments: false,
  }

  showComments = () => {
    this.setState({isShowingComments: !this.state.isShowingComments})
  }

  render() {
    const {comments} = this.props;
    const {isShowingComments} = this.state;
    const {showComments} = this;

    return (
      <div className="comment-list">
          <button
            className="comment-btn"
            onClick={showComments}
          >
              {comments.length} comments
          </button>
          <div className={isShowingComments ? "show-comments" : "hide-comments"}>
              {comments.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                />
              ))}
          </div>
      </div>
    )
  }
}


export default CommentList;