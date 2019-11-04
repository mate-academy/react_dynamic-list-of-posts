import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import PostList from './components/postsList/PostsList';
import { getPosts, getUsers, getComments } from './Api';

class App extends React.PureComponent {
  state = {
    posts: [],
    users: [],
    comments: [],
    isLoading: false,
    loadingError: false,
    wasLoaded: false,
  };

  getInfoFromServer = async () => {
    this.setState({
      isLoading: true,
      wasLoaded: true,
    });

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([posts, users, comments]) => this.setState({
        posts: posts,
        users: users,
        comments: comments,
        isLoading: false,
        loadingError: false,
      }))
      .catch(() => this.setState({
        loadingError: true,
        isLoading: false,
      }));
  }

  render() {
    const { posts, users, comments, isLoading, loadingError, wasLoaded } = this.state;

    if (!isLoading && !wasLoaded) {
      return <Button secondary onClick={this.getInfoFromServer}>Load posts from server</Button>;
    } else if (isLoading) {
      return <Button secondary loading>Loading</Button>;
    }

    if (wasLoaded && !loadingError) {
      return <PostList posts={posts} users={users} comments={comments} />;
    } else if (wasLoaded && loadingError) {
      return (
        <>
          <p>Loading error, please try again!</p>
          <Button secondary onClick={this.getInfoFromServer}>Try again</Button>
        </>
      );
    }
  }
}

export default App;
