import React from 'react';
import './App.css';
import { getPosts, getUsers, getComments } from './api/api';
import PostList from './components/PostsList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      listOfPosts: [],
    };
  }

  loadData = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([postsItems, usersItems, commentsItems]) => {
        const listOfPosts = postsItems.map(post => ({
          ...post,
          user: usersItems.find(user => user.id === post.userId),
          comments: commentsItems.filter(comment => comment.postId === post.id),
        }));

        this.setState({
          listOfPosts,
          isLoading: false,
        });
      });
  };

  render() {
    const { listOfPosts, isLoading } = this.state;

    if (!listOfPosts.length) {
      if (isLoading) {
        return (
          <div className="btn-container">
            <button
              type="button"
              className="load-btn"
              onClick={this.loadData}
            >
              Loading...
            </button>
          </div>
        );
      }

      return (
        <div className="btn-container">
          <button
            type="button"
            className="load-btn"
            onClick={this.loadData}
          >
            Load
          </button>
        </div>
      );
    }

    return (
      <div className="container">
        <PostList posts={listOfPosts} />
      </div>
    );
  }
}

export default App;
