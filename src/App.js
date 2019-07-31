import React from 'react';
import './App.css';
import Post from './Post';

const getUsers = async() => {
  const url1 = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url1);
  const result = response.json();

  return result;
};

const getPosts = async() => {
  const url2 = 'https://jsonplaceholder.typicode.com/posts';
  const response = await fetch(url2);
  const result = response.json();

  return result;
};

const getComments = async() => {
  const url3 = 'https://jsonplaceholder.typicode.com/comments';
  const response = await fetch(url3);
  const result = response.json();

  return result;
};

class App extends React.Component {
  state = {
    users: [],
    posts: [],
    visiblePosts: [],
    comments: [],
    inputText: '',
    isLoaded: false,
    isLoading: false,
  }

  loadData = async() => {
    const usersData = await getUsers();
    const postsData = await getPosts();
    const commentsData = await getComments();

    this.setState({
      users: usersData,
      posts: postsData,
      visiblePosts: postsData,
      comments: commentsData,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  }

  checkPostInfo = (info, inputValue) => {
    if (info) {
      return info.toLowerCase().includes(inputValue.toLowerCase());
    }

    return false;
  }

  inputFilter = (event) => {
    const inputValue = event.target.value;

    this.setState(prevState => ({
      inputText: inputValue,
      visiblePosts: prevState.posts.filter((post) => {
        const filterFields = post.title + post.body;

        return this.checkPostInfo(filterFields, inputValue);
      }),
    }));
  }

  render() {
    const {
      users, visiblePosts, comments, isLoaded, isLoading, inputText,
    } = this.state;

    const Posts = visiblePosts.map(
      post => (
        <Post
          key={post.id}
          post={post}
          users={users}
          comments={comments}
        />
      )
    );

    return (
      <div className="App">
        <h1 className="title">Dynamic list of posts</h1>
        {(isLoaded)
          ? (
            <>
              <input
                type="text"
                className="inputFilter"
                value={inputText}
                onChange={this.inputFilter}
                placeholder="Find your post"
              />
              {Posts}
            </>
          ) : (
            <button
              type="button"
              className="loadButton"
              disabled={isLoading}
              onClick={() => this.loadData()}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          )
        }
      </div>
    );
  }
}

export default App;
