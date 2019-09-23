import React from 'react';
import './App.css';
import PostList from './component/PostList/PostList';

const postWithCommentsUser = (users, posts, comments) => posts.map(post => (
  {
    ...post,
    user: users.find(user => (
      user.id === post.userId
    )),
    comments: comments.filter(comment => (
      comment.postId === post.id
    )),
  })
);

class App extends React.Component {
  state = {
    posts: [],
    users: [],
    comments: [],
    isLoading: false,
    isLoaded: false,
    errors: '',
    countTryConnect: 0,
  };

  handleData = () => {
    this.setState({ isLoading: true,
      errors: '' });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos'),
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ])
      .then(([todos, users, comments]) => Promise.all([todos.json(),
        users.json(),
        comments.json()]))
      .then(([todosData, usersData, commentsData]) => this.setState({
        posts: todosData,
        users: usersData,
        comments: commentsData,
        isLoading: false,
        isLoaded: true,
        countTryConnect: 0,
      }))
      .catch((error) => {
        this.setState(prevState => ({
          errors: error.message,
          countTryConnect: prevState.countTryConnect + 1,
          isLoaded: false,
          isLoading: false,
        }));
      });
  };

  render() {
    const { posts,
      users,
      comments,
      isLoading,
      isLoaded,
      errors,
      countTryConnect,
    } = this.state;

    const listPost = postWithCommentsUser(users, posts, comments);

    return (
      <>
        <h1>Dynamic list of posts</h1>
        {!posts.length && !users.length && !comments.length && !isLoading
          && <button
            type="button"
            className="app__button-load"
            onClick={this.handleData}
          >
              Load todos
          </button>
        }

        {isLoading
          && (
            <div className="app__loading">
              <span>Loading...</span>
            </div>
          )
        }

        {errors
          && (
            <div className="app__error-message">
              <p>
                {`Error: ${errors} date`}
              </p>
              <p>
                {`Try to connect: ${countTryConnect}`}
              </p>
            </div>
          )
        }

        { isLoaded && <PostList posts={listPost}/> }
      </>
    );
  }
}

export default App;
