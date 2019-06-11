import React, { Component } from 'react';
import Post from './Post';
import CommentList from './CommentList';
import User from './User';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.search = this.search.bind(this);
  }

  search(event) {
    const value = event.target.value;
    console.log(event.target.value)
    this.setState(state => state.search = value)
  }

  render() {
    return (
      <div className="post-list">
        <input
          type="text"
          onChange={this.search}
          value={this.state.search} />
        {this.props.posts
          .filter(item =>
            item.title.includes(this.state.search) ||
            item.body.includes(this.state.search))
          .map(item =>
            <Post key={item.id}
            title={item.title} body={item.body}
              comments={
                <CommentList postId={item.id} comments={this.props.comments} />}>
              <User user={this.props.users[item.userId]} />
            </Post>)}
      </div>
    )
  }
}
