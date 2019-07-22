import React from 'react';
import './App.css';
import PostList from './components/PostList';

class App extends React.Component {
  state = {
    postWidthUser: [],
    isLoading: false,
    defaultPostWidthUser: [],
  };

  loadData = () => {
    this.setState({
      isLoading: true,
    });
    const posts = fetch('https://jsonplaceholder.typicode.com/posts')
      .then(responce => responce.json());
    const users = fetch('https://jsonplaceholder.typicode.com/users')
      .then(responce => responce.json());
    const comments = fetch('https://jsonplaceholder.typicode.com/comments')
      .then(responce => responce.json());

    Promise.all([posts, users, comments]).then(([posts, users, comments]) => {
      const postWidthUser = posts.map(item => ({
        ...item,
        user: users.find(user => user.id === item.userId),
        comments: comments.filter(comment => comment.postId === item.id),
      }));
      this.setState({
        defaultPostWidthUser: postWidthUser,
        postWidthUser: [...postWidthUser],
        isLoading: false,
      });
    });
  };

  searchData = (event) => {
    const searchValue = event.target.value;
    this.setState(prevState => ({
      postWidthUser: prevState.defaultPostWidthUser
        .filter(item => [item.title, item.body]
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase())),
    }));
  };

  render() {
    if (this.state.defaultPostWidthUser <= 0) {
      return <button className="load-button" onClick={this.loadData}>
        {this.state.isLoading ? 'Loading...' : 'Load' }
      </button>;
    }
    return (
      <div className="App">
        <div className="search-filter">
          <input className="search-filter__input" onChange={this.searchData} />
        </div>
        <PostList items={this.state.postWidthUser} />
      </div>
    );
  }
}

export default App;
