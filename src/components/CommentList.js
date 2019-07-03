import React from 'react';
import Comment from './Comment';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments,
      showed: false,
    };
  }

  showComments() {
    this.setState(prevState => ({
      showed: !prevState.showed,
    }));
  }

  render() {
    if (!this.state.showed) {
      return <button onClick={() => this.showComments()}>Show comments</button>
    }

    return (
      <div>
        <button onClick={() => this.showComments()}>Hide comments</button>
        {this.state.comments.map(comment => <Comment {...comment} />)}
      </div>
    )
  }
}
