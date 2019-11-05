import React from 'react';

import './App.css';

import PostList from './components/PostList';
import { postsURL, usersURL, commentsURL } from './api/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      preparedPosts: [],
      input: '',
      filter: '',
    };
  }

  loadData = () => {
    this.setState({
      isLoading: true,
      error: false,
    });

    Promise.all([postsURL, usersURL, commentsURL])
      .then(([postList, userList, commentList]) => {
        this.setState({
          preparedPosts: postList.map(post => ({
            ...post,
            user: userList.find(user => post.userId === user.id),
            comments: commentList.filter(comment => comment.postId === post.id),
          })),
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  filterCanged = (e) => {
    this.setState({ filter: e.target.value });
  }

  filterbutton = (chosenFilter) => {
    switch (chosenFilter) {
      case 'Post Text':
        this.setState(prevState => ({
          ...prevState,
          preparedPosts:
          prevState.preparedPosts.filter(
            ({ body }) => body.includes(prevState.filter)
          ),
        }));
        break;
      case 'Post Title':
        this.setState(prevState => ({
          ...prevState,
          preparedPosts: prevState.preparedPosts.filter(
            ({ title }) => title.includes(prevState.filter)
          ),
        }));
        break;
      default:
        this.setState(prevState => ({
          ...prevState,
          preparedPosts: prevState.preparedPosts,
        }));
        break;
    }
  }

  render() {
    const {
      isLoading, error, preparedPosts,
    } = this.state;

    if (isLoading) {
      return <p>loading...</p>;
    }

    if (error) {
      return (
        <>
          <p>Error occurred!!!</p>
          <button
            type="button"
            onClick={this.loadData}
          >
            Try Again!
          </button>
        </>
      );
    }

    if (!preparedPosts.length) {
      return (
        <>
          <p>No posts yet!</p>
          <button type="button" onClick={this.loadData} color="green">
            Load
          </button>
        </>
      );
    }

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        <input
          type="text"
          placeholder="What are you searching?"
          onChange={this.filterCanged}
          value={this.state.filter}
        />
        <button type="button" onClick={() => this.filterbutton('Post Text')}>
          Post Text
        </button>
        <button type="button" onClick={() => this.filterbutton('Post Title')}>
          Post Title
        </button>
        <PostList posts={preparedPosts} />
      </div>
    );
  }
}

export default App;
