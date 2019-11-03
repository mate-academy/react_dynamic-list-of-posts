import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import posts from './api/posts';
import users from './api/users';
import comments from './api/comments';
import PostList from './components/postList/PostList';

function postsWithUsersAndComment(postList, userList, commentList) {
  return postList.map(post => ({
    ...post,
    user: userList.find(user => user.id === post.userId),
    comments: commentList.filter(comment => comment.postId === post.id),
  }));
}

class App extends React.Component {
  state = {
    postList: [],
    userList: [],
    commentList: [],
    isLoading: false,
    hasError: false,
  };

  getData = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([posts(), comments(), users()])
      .then(([postList, commentList, userList]) => {
        this.setState({
          postList,
          commentList,
          userList,
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

  render() {
    const {
      postList, commentList, userList, isLoading, hasError,
    } = this.state;
    const fullPosts = postsWithUsersAndComment(postList, userList, commentList);

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

    if (!fullPosts.length) {
      return (
        <>
          <p>No posts and comments yet</p>
          <Button type="button" onClick={this.getData}>Load</Button>
        </>
      );
    }

    return <PostList posts={fullPosts} />;
  }
}

export default App;
