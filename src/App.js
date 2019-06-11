import React, { Component } from 'react';
import PostList from './components/PostList';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedPosts: false,
      posts: null,
      loadedUsers: false,
      users: null,
      loadedComments: false,
      comments: null,
    };


  }

  async requstPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    this.setState({
      loadedPosts: true,
      posts: await response.json()
    });
  }

  async requstUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    this.setState({
      loadedUsers: true,
      users: await response.json()
    });
  }

  async requstComments() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    );
    this.setState({
      loadedComments: true,
      comments: await response.json()
    });
  }

  getData() {
    const modifiedPosts = this.state.posts.map(post => {
      return {
        title: post.title,
        body: post.body,
        id: post.id,
        userInfo: this.state.users.find(user => {

          return user.id === post.userId;
        }),
        comments: this.state.comments.filter(comment => {

          return comment.postId === post.id;
        })
      };
    });
    return modifiedPosts;
  }

  render() {
    const { loadedPosts, loadedComments, loadedUsers } = this.state;
    if (
      !loadedPosts &&
      !loadedComments &&
      !loadedUsers
    ) {
      return (
        <div>
          <button
            onClick={() => {
              this.requstComments();
              this.requstPosts();
              this.requstUsers();
            }}
          >
            Load
          </button>
        </div>
      );
    } else if (
      loadedPosts &&
      loadedComments &&
      loadedUsers
    ) {
      return <PostList posts={this.getData()} />;
    } else {
      return (
        <button type="button" disabled>Loading...</button>
      )
    }
  }
}
