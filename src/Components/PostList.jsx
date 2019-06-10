import React, { Component } from 'react';
import Post from './Post.jsx';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.getItem = this.getItem.bind(this);
    this.sortTitle = this.sortTitle.bind(this);
  }

  getUrl(url) {
    return fetch(url)
    .then(response => response.json()).then(response => response)
  }

  getItem() {
    Promise.all([
      this.getUrl('https://jsonplaceholder.typicode.com/posts'),
      this.getUrl('https://jsonplaceholder.typicode.com/users'),
      this.getUrl('https://jsonplaceholder.typicode.com/comments')])
    .then(([posts, users, comments]) => this.setState({
      items: posts.map(item => ({
        ...item,
        users: users.find(user => user.id === item.userId),
        comments: comments.find(com => com.postId === item.userId)
      }))
    }));
  };

  sortTitle() {
    this.setState(prevState => ({
      items: prevState.items.sort((a, b) => a.title.localeCompare(b.title))
    }))
  }

  render() {
    return (
      <div className="post">
        <button onClick={this.getItem}>Load Content</button>
        <button onClick={this.sortTitle}>Changed title</button>
        {this.state.items.map(post =>
        <Post post={post} key={post.id}/>
        )}
      </div>
    )
  }
}
