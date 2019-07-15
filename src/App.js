import React from 'react';
import './App.css';

import PostList from './PostList';

const ADRESS = 'https://jsonplaceholder.typicode.com/';

const getData = async(link) => {
  const response = await fetch(link);
  const posts = await response.json();

  return posts;
};

class App extends React.Component {
  state = {
    posts: [],
    postsCopy: [],
    isLoaded: false,
  }

  async componentDidMount() {
    const posts = await getData(ADRESS.concat('posts'));
    const users = await getData(ADRESS.concat('users'));
    const comments = await getData(ADRESS.concat('comments'));

    const postsData = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => post.id === comment.postId),
    }
    ));

    this.setState({
      posts: [...postsData],
      postsCopy: [...postsData],
    });
  }

  showTable = () => {
    this.setState({
      isLoaded: true,
    });
  }

  filter = (event) => {
    const dataToFilter = event.target.value;

    this.setState((prevState) => {
      const updatedList = [...prevState.posts]
        .filter((item) => {
          const BasicArray = item.title + item.text;
          return BasicArray.toLowerCase().search(
            dataToFilter.toLowerCase()
          ) !== -1;
        });

      return { postsCopy: updatedList };
    });
  }

  render() {
    const { postsCopy, isLoaded } = this.state;
    return (
      <div className="App">
        {isLoaded
          ? <PostList posts={postsCopy} filter={this.filter} />
          : <button type="button" onClick={this.showTable}>Show data</button>}

      </div>
    );
  }
}

export default App;
