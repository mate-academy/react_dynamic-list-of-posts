import React, { Component } from 'react';
import PostList from './components/postList/PostList';
import Spinner from './components/spinner/Spinner';
import { posts, users, comments } from './services/PostList';

export default class App extends Component {

  state = {
    postList: null,
    isLoading: false,
    hasError: false,
  }

  loadData = async () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([posts, users, comments])
      .then(([posts, users, comments]) => {
        this.setState({
            postList: posts.map(post => ({
            ...post,
            user: users.find(user => user.id === post.userId),
            comment: comments.filter(comment => comment.postId === post.id),
          })),
        });
      })
      .catch(() => {
        this.setState({ hasError: true, isLoading: false })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })


  };

  render() {
    const { postList, isLoading, hasError } = this.state;

    if (isLoading) {
      return <Spinner />
    } else if (hasError) {
      return (
      <>
        <Spinner />
        <p>We have some problems with our server, please try again.</p>
        <button
          onClick={this.loadData}
          className="btn btn-outline-dark"
        >
          Try again
        </button>
      </>
      );
    } else if (postList === null) {
      return (
        <button
          onClick={this.loadData}
          className="btn btn-outline-dark"
        >
          Load posts
        </button>
    );
    } else {
      return (
        <PostList postInfo = {postList} />
      );
    }
  }
}
