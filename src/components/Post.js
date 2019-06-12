import React from 'react';
import User from './User';
import '../css/Post.css'
import CommentList from './CommentList';

class Post extends React.Component {
  render() {
    return (
      <section className='post'>
        <h2>{this.props.item.title}</h2>
        <p>{this.props.item.body}</p>
        <User user={this.props.item.user} />
        <CommentList comments={this.props.item.comments} />
      </section>
    )
  }
}

export default Post;