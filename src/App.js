import React from 'react';
import './App.css';
import PostList from './Components/PostList/PostList';
import Header from './Components/Header/Header';

const APIPOSTS_URl = 'https://jsonplaceholder.typicode.com/posts';
const APICOMMENTS_URl = 'https://jsonplaceholder.typicode.com/comments';
const APIUSERS_URl = 'https://jsonplaceholder.typicode.com/users';

const getDataFromServer = async(url) => {
  const data = await fetch(url);

  return data.json();
};

const addingUsers = (postList, usersList) => postList.map(post => (
  {
    ...post,
    user: usersList.find(user => (
      user.id === post.userId
    )),
  }
));

class App extends React.Component {
  state = {
    posts: [],
    comments: [],
    users: [],
    isLoading: false,
    originalPosts: [],
    filterInputValue: '',
  }

  loadAllTodos = () => {
    this.setState({ isLoading: true });

    Promise
      .all([
        getDataFromServer(APIPOSTS_URl),
        getDataFromServer(APIUSERS_URl),
        getDataFromServer(APICOMMENTS_URl),
      ])
      .then(([posts, users, comments]) => {
        this.setState({
          posts: addingUsers(posts, users),
          originalPosts: addingUsers(posts, users),
          isLoading: false,
          users,
          comments,
        });
      });
  }

  handleInputFilter = ({ target }) => {
    this.setState({
      filterInputValue: target.value,
      posts: [...this.state.originalPosts]
        .filter(({ title }) => title.includes(this.state.filterInputValue)),
    });
  }

  handleResetPosts = () => {
    this.setState(prevState => ({
      posts: [...prevState.originalPosts],
    }));
  }

  render() {
    const {
      posts, users, isLoading, comments, filterInputValue, originalPosts,
    } = this.state;

    if (isLoading) {
      return <p className="loading-text">Posts are loading now...</p>;
    }

    if (originalPosts.length === 0) {
      return (
        <button
          onClick={this.loadAllTodos}
          type="button"
          className="data-button"
        >
        Load all posts
        </button>
      );
    }

    return (
      <main>
        <Header
          posts={posts}
          users={users}
          comments={comments}
        />
        <input
          type="text"
          onChange={this.handleInputFilter}
          value={filterInputValue}
          className="filter-input"
        />
        <PostList posts={posts} commentList={comments} />
      </main>
    );
  }
}

export default App;
