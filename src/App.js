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
    originalPosts: [],
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
      .then(([todos, users, comments]) => Promise.all([
        todos.json(),
        users.json(),
        comments.json()
      ]))
      .then(([todosData, usersData, commentsData]) => this.setState({
        originalPosts: postWithCommentsUser(todosData, usersData, commentsData),
        posts: postWithCommentsUser(usersData, todosData, commentsData),
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
      isLoading,
      isLoaded,
      errors,
      countTryConnect,
    } = this.state;

    return (
      <>
        <h1>Dynamic list of posts</h1>
        {!posts.length && !isLoading
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

        { isLoaded && <PostList posts={posts}/> }
      </>
    );
  }
}

export default App;
