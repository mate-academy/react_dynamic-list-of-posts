import React from 'react';
import Comment from './Comment';
import '../css/Comments.css';

class CommentList extends React.Component {
  render() {
    return (
      <div className='comments'>
        {this.props.comments.map((c) => <Comment comment={c} key={c.id} />)}
      </div>
    )
  }
}

export default CommentList;
