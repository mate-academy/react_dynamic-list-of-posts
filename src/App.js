import React from 'react';
import './App.css';
import PostList from './components/PostList';

const getPosts = async() => {
  const url = 'https://jsonplaceholder.typicode.com';

  const postsFetch = await fetch(`${url}/posts`);
  const posts = await postsFetch.json();

  const usersFetch = await fetch(`${url}/users`);
  const users = await usersFetch.json();

  const commentsFetch = await fetch(`${url}/comments`);
  const comments = await commentsFetch.json();

  const postWithUsersAndComments = posts.map(post => (
    {
      ...post,
      user: users.find(user => user.id === post.userId),
      postComments: comments.filter(comment => comment.postId === post.id),
    }
  ));

  return postWithUsersAndComments;
};

class App extends React.Component {
  state={
    postWithUsersAndComments: [],
    postWithUsersAndCommentsOrigin: [],

    isLoading: false,
    isLoaded: false,
    filterValue: '',
  }

  handleClick = async() => {
    this.setState({
      isLoading: true,
    });

    const posts = await getPosts();

    this.setState({
      postWithUsersAndComments: posts,
      postWithUsersAndCommentsOrigin: posts,
      isLoading: false,
      isLoaded: true,
    });
  }

  handlePostFilter = (event) => {
    const { value } = event.target;

    this.setState({
      filterValue: value,
    });

    this.setState(prevState => ({
      postWithUsersAndComments: [...prevState.postWithUsersAndCommentsOrigin]
        .filter(item => [item.title, item.body].join(' ').includes(value)),
    }));
  };

  render() {
    return (
      <div className="App">
        <PostList
          postWithUsersAndComments={this.state.postWithUsersAndComments}
          isLoading={this.state.isLoading}
          isLoaded={this.state.isLoaded}
          handleClick={this.handleClick}
          handlePostFilter={this.handlePostFilter}
          filterValue={this.state.filterValue}
        />
      </div>
    );
  }
}

export default App;
