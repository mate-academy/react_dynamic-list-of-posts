import React, { Component } from 'react'
import Post from './components/Post';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
      requested: false,
    }
    this.requestData = this.requestData.bind(this);
  }

  requestData() {
    const PostsResp = fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json());

    const UsersResp = fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());

    const CommentsResp = fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json());

    Promise.all([PostsResp, UsersResp, CommentsResp])
      .then(([posts, users, comments]) => {
        this.setState({
          requested: true,
        });

        const commentMap = {};
        comments.forEach(el => {
          commentMap[el.postId] ? commentMap[el.postId].push(el) : commentMap[el.postId] = [el];
        });

        const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});

        this.postsMap = posts.map(post => ({
          ...post, comments: commentMap[post.id], user: usersMap[post.userId]
        }));

        this.setState({
          loaded: true,
        });
      })
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>{this.postsMap.map(post => <Post post={post} key={post.id} />)}</div>
      );
    } else {
      return (
        <button
          onClick={this.requestData}
          disabled={this.state.requested}>
          {this.state.requested ? "Loading..." : "Load Data"}
        </button>
      );
    }
  }
}
