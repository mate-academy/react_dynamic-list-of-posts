import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import { users, posts, comments } from './api/api';
import PostList from './components/postList/PostList';

class App extends React.Component {
  state = {
    originPosts: null,
    fullPosts: null,
    isLoading: false,
    hasError: false,
  };

  getData = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([posts, comments, users])
      .then(([postList, commentList, userList]) => {
        const fullPosts = postList.map(post => ({
          ...post,
          user: userList.find(user => user.id === post.userId),
          comments: commentList.filter(comment => comment.postId === post.id),
        }));

        this.setState({
          fullPosts,
          originPosts: fullPosts,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleSearch = (event) => {
    const { originPosts } = this.state;

    this.setState({
      fullPosts: [...originPosts]
        .filter(post => (post.title.includes(event.target.value))
        || (post.body.includes(event.target.value))),
    });
  };

  render() {
    const {
      isLoading, hasError, fullPosts,
    } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (hasError) {
      return (
        <>
          <p>Loading failed</p>
          <Button type="button" onClick={this.getData}>Retry</Button>
        </>
      );
    }

    if (fullPosts === null) {
      return (
        <>
          <p>No posts and comments yet</p>
          <Button type="button" onClick={this.getData}>Load</Button>
        </>
      );
    }

    return <PostList posts={fullPosts} search={this.handleSearch} />;
  }
}

export default App;
