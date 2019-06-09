import React, { Component } from 'react'
import Post from './components/Post';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
      requested: false,
      postsList: []
    }
    this.requestData = this.requestData.bind(this);
  }

  getData(url) {
    return fetch(url).then(response => response.json());
  }

  requestData() {
    this.setState({
      requested: true,
    });

    Promise.all([
      this.getData('https://jsonplaceholder.typicode.com/posts'),
      this.getData('https://jsonplaceholder.typicode.com/users'),
      this.getData('https://jsonplaceholder.typicode.com/comments')
    ])
      .then(([posts, users, comments]) => {
        const commentsMap = {};
        comments.forEach(el => {
          commentsMap[el.postId] ? commentsMap[el.postId].push(el) : commentsMap[el.postId] = [el];
        });

        const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});

        this.state.postsList = posts.map(post => ({
          ...post, comments: commentsMap[post.id], user: usersMap[post.userId]
        }));

        this.setState({
          loaded: true,
        });
      });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>{this.state.postsList.map(post => <Post post={post} key={post.id} />)}</div>
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
