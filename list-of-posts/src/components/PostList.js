import React, { Component } from 'react'
import Post from './Post';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.getItem = this.getItem.bind(this);
    this.sortTitle = this.sortTitle.bind(this);
  }

  loadData(url){
    return fetch(url)
      .then(data => data.json())
  };
  
  getItem() {
    Promise.all([this.loadData(' https://jsonplaceholder.typicode.com/posts'),
    this.loadData('https://jsonplaceholder.typicode.com/users'),
    this.loadData('https://jsonplaceholder.typicode.com/comments')])
      .then(([posts, users, comments]) => this.setState({
        items: posts.map(item => ({
          ...item,
          users: users.find(user => user.id === item.userId),
          comments: comments.find(comment => comment.postId === item.userId)
        }))
      }));
  }

  sortTitle() {
    this.setState(state => ({
      items: state.items.sort((a,b) => a.title.localeCompare(b.title))
    }))
  }
  render() {
    return (
      <div>
        <button onClick={this.getItem}>Load Data</button>
        {this.state.items.length !== 0 &&
          <button onClick={this.sortTitle}>Sort title</button>
        }
        {this.state.items.map(post => 
        <Post 
          key={post.id} 
          post={post}
          />)}
      </div>
    )
  }
}
