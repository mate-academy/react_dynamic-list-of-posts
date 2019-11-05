import React, { Component } from 'react';
import './App.css';
import { loadUsers, loadPosts, loadComments } from './component/helper';
import PostList from './component/postList/PostList';

class App extends Component {
  state = {
    loading: false,
    postList: [],
  }

  loadPostList = async() => {
    this.setState({
      loading: true,
    });

    Promise.all([loadUsers(), loadPosts(), loadComments()])
      .then(([userList, postsList, commentsList]) => {
        const List = postsList.map(post => ({
          ...post,
          user: userList.find(item => item.id === post.userId),
          comments: commentsList.filter(comment => comment.postId === post.id),
        }));

        this.setState({ postList: List });
      });
  }

  render() {
    const { loading, postList } = this.state;

    if (!postList.length) {
      if (loading) {
        return `Loading...`;
      }

      return (
        <button
          type="button"
          className="ui labeled icon button"
          onClick={this.loadPostList}
        >
          <i className="right arrow icon" />
          Load Posts
        </button>
      );
    }

    return (
      <PostList table={this.state.postList} />
    );
  }
}

export default App;
