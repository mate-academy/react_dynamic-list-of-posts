import React, { Component } from 'react';
import PostList from './components/PostList';
import { BASE_URL } from './constants';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      users: null,
      comments: null,
      compliedPosts: null,
      requested: false
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.getData = this.getData.bind(this);
    this.requstComments = this.requstComments.bind(this);
    this.requstPosts = this.requstPosts.bind(this);
    this.requstUsers = this.requstUsers.bind(this);
  }

  async requstPosts() {
    const response = await fetch(`${BASE_URL}posts`);
    this.setState({
      posts: await response.json()
    });
  }

  async requstUsers() {
    const response = await fetch(`${BASE_URL}users`);
    this.setState({
      users: await response.json()
    });
  }

  async requstComments() {
    const response = await fetch(
      `${BASE_URL}comments`
    );
    this.setState({
      comments: await response.json()
    });
  }

  sendRequest() {
    this.setState({
      requested: true
    });
    this.requstPosts();
    this.requstUsers();
    this.requstComments();
  }

  getData() {
    const { posts, users, comments } = this.state;

    const modifiedPosts = posts.map(post => {
      return {
        title: post.title,
        body: post.body,
        id: post.id,
        userInfo: users.find(user => {
          return user.id === post.userId;
        }),
        comments: comments.filter(comment => {
          return comment.postId === post.id;
        })
      };
    });
    this.setState({
      compliedPosts: modifiedPosts
    });
  }

  componentDidUpdate() {
    const { 
      posts, 
      users, 
      comments, 
      compliedPosts 
    } = this.state;
    if (posts 
        && users 
        && comments 
        && !compliedPosts) {
      this.getData();      
    }
  }

  render() {
    const { compliedPosts, requested } = this.state;
    if (!compliedPosts) {
      return (
        <div>
          <button onClick={this.sendRequest}>
            {requested ? 'Loading...' : 'load'}
          </button>
        </div>
      );
    } else {
      return <PostList posts={compliedPosts} />;
    }
  }
}
