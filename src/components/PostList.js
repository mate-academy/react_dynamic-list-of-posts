import React, { Component } from 'react';
import postList from '../postList';
import Post from './Post';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      users: null,
      comments: null,
      isLoading: false,
      fullPosts: null,
      showPosts: null,
      inputValue: '',
    };
    this.LoadData = this.LoadData.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  async LoadData() {
    let {
      posts, users, comments, fullPosts, showPosts,
    } = this.state;
    let response;

    this.setState({ isLoading: true });
    response = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts = await response.json();
    response = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await response.json();
    response = await fetch('https://jsonplaceholder.typicode.com/comments');
    comments = await response.json();
    fullPosts = [...(postList(posts, users, comments))];
    showPosts = [...fullPosts];
    this.setState({
      posts, users, comments, fullPosts, showPosts,
    });
  }

  changeInput(action) {
    const inputValue = action.target.value;

    this.setState({ inputValue });
  }

  submitInput(action) {
    action.preventDefault();
    const { fullPosts, inputValue } = this.state;
    let { showPosts } = this.state;

    if (inputValue === '') {
      showPosts = [...fullPosts];
    } else {
      showPosts = [...fullPosts.filter(
        post => post.title.includes(inputValue.trim())
      )];
    }

    this.setState({ showPosts });
  }

  render() {
    const {
      posts, users, comments, isLoading, showPosts, inputValue,
    } = this.state;

    if (posts === null || users === null || comments === null) {
      if (isLoading) {
        return (
          <span>Data is loading ...</span>
        );
      }

      return (
        <button type="button" onClick={this.LoadData}>Load data</button>
      );
    }

    return (
      <>
        <form onSubmit={this.submitInput}>
          <input type="text" onChange={this.changeInput} value={inputValue} />
        </form>
        {
          showPosts.map(
            post => <Post key={post.id} post={post} />
          )
        }
      </>
    );
  }
}

export default PostList;
