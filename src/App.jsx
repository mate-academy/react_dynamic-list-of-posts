import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.data = [
      this.props.urlPosts, this.props.urlUsers, this.props.urlComments];
    this.state = {
      posts: [],
      users: [],
      comments: [],
      status: 'before dawnload'
    }
    this.showPosts = this.showPosts.bind(this);
  }

  usersToObj(users) {
    const newObj = users.reduce(((acc, user) => {
      acc[user.id] = user;
      return acc;
    }), {})
    return newObj;
  }

  parseData(dataArrs) {
    const posts = dataArrs[0];
    const users = this.usersToObj(dataArrs[1]);
    const comments = dataArrs[2];

    this.setState(() => ({
      posts: posts,
      users: users,
      comments: comments,
      status: 'redy to show'
    }))
  }

  createPromise(url) {
    return fetch(url).then(resp => resp.json());
  }

  getAllData(urls) {
    return Promise.all(urls.map(url => this.createPromise(url)));
  }

  init() {
    this.getAllData(this.data).then(responses => this.parseData(responses))
  }

  showPosts() {
    this.setState(state => state.status = 'loading');
    this.init();
  }

  render() {
    return (
      <div>
        {this.state.status === 'before dawnload'
          && <button className="download" onClick={this.showPosts}>
            Show Todos!</button>}
        {this.state.status === 'loading'
          && <button className="download" disabled>Loading...</button>}
        {this.state.status === 'redy to show'
          && <PostList posts={this.state.posts} users={this.state.users}
            comments={this.state.comments} />}
      </div>
    );
  }
}
