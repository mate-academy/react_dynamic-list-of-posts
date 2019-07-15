import React from 'react';
import './App.css';
import PostList from './components/PostList';
import getPosts from './API_DATA';

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
