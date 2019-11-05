import React from 'react';
import Comment from './Comment';

export default class CommentList extends React.Component {
  state = {
    commentsIsShown: false,
  };


  showComments = () => {
    this.setState(({ commentsIsShown }) => ({
      commentsIsShown: !commentsIsShown,
    }));
  };

  render() {
    const { comments } = this.props;

    if (!this.state.commentsIsShown) {
      return <button className={'btn btn-outline-dark btn-md'}
             onClick={this.showComments}>Show comments</button>
    }
    return (
      <div>
        <button className={'btn btn-outline-dark btn-md'}
         onClick={this.showComments}>Hide comments</button>
        {
          comments.map(comment => (
          <Comment key={comment.id} {...comment} />
          ))
        }
      </div>
    )
  }
}
