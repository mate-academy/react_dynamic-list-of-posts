import React, { Component } from 'react';
import User from './User';
import Comments from './Comments';
import '../css/Post.css';

class Post extends Component {
  render() {
    return (
      <div className = 'post'>
        <h2>{this.props.title}</h2>
        <p>{this.props.text}</p>
        <p>
          <User user = {this.props.user}/>          
        </p>
        <section className = "comments_block">
          <Comments comments = {this.props.comments}/>          
        </section>
      </div>
    );
  }
}

export default Post; 