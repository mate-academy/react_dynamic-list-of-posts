import React, { Component } from 'react';
import PostList from './PostList';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: false,
      todos: null,
      users: null,
      comments: null
    };
  this.getPosts = this.getPosts.bind(this);
  }

  downloadPosts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    let posts = [];
    xhr.addEventListener('load', ()=> {
      posts = JSON.parse(xhr.response);
      this.setState({
        posts: posts
      });
    });
    xhr.send();
  }

  downloadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    let users = [];
    xhr.addEventListener('load', ()=> {
      users = JSON.parse(xhr.response);
      this.setState({
      users: users
      });
    });
    xhr.send();
  }

  downloadComments() {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments');
  let comments = [];
  xhr.addEventListener('load', ()=> {
    comments = JSON.parse(xhr.response);
    this.setState({
      comments: comments     
    });
  });
  xhr.send();
  }

  getPosts() {       
    this.setState({
      button: true            
    });
  this.downloadUsers();
  this.downloadPosts();
  this.downloadComments();
  }

  render() {

    if (!this.state.button) {
      return (
        <button onClick={this.getPosts}>
          Show posts
        </button>
      );
    } else if (!this.state.posts || !this.state.users || !this.state.comments) {
      return <button>Loading</button>;
    } else { 
      return (
      <PostList posts={this.state.posts} users={this.state.users} comments={this.state.comments}/>
      );
    }
  };
}

export default Posts;