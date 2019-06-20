import React, { Component } from 'react';
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
      status: 'before download'
    };
    this.showPosts = this.showPosts.bind(this);
  }

  usersToObj(users) {
    const newObj = users.reduce(((acc, user) => {
      acc[user.id] = user;
      return acc;
    }), {});
    return newObj;
  }

  parseData(dataArrs) {
    const [posts, users, comments] = dataArrs;
    const usersObj = this.usersToObj(users);

    this.setState(() => ({
      posts: posts,
      users: usersObj,
      comments: comments,
      status: 'ready to show'
    }));
  }

  createPromise(url) {
    return fetch(url).then(resp => resp.json());
  }

  getAllData(urls) {
    return Promise.all(urls.map(url => this.createPromise(url)));
  }

  showPosts() {
    this.setState((state) => ({
      ...state,
      status: 'loading'}));
    this.getAllData(this.data).then(responses => this.parseData(responses));
  }

  render() {
    return (
      <div>
        {this.state.status === 'before download'
          && <button className="download" onClick={this.showPosts}>Show Todos!</button>}
        {this.state.status === 'loading'
          && <button className="download" disabled>Loading...</button>}
        {this.state.status === 'ready to show'
          && <PostList posts={this.state.posts} users={this.state.users}
            comments={this.state.comments} />}
      </div>
    );
  }
}
