import React from 'react';
import './App.css';
import PostList from './components/PostList';

const url = 'https://jsonplaceholder.typicode.com/';

const getData = async(link) => {
  let responce = await fetch(link);

  responce = await responce.json();

  return responce;
};

const getFullData = async() => {
  const postsFromServer = await getData(`${`${url}posts`}`);
  const usersFromServer = await getData(`${`${url}users`}`);
  const commentsFromServer = await getData(`${`${url}comments`}`);

  return postsFromServer.map(post => ({
    ...post,
    user: usersFromServer.find(user => post.userId === user.id),
    comments: commentsFromServer.filter(comment => comment.postId === post.id),
  }));
};

let fullPostsFromServer = [];

class App extends React.Component {
  state = {
    visiblePosts: [],
  }

  async componentDidMount() {
    fullPostsFromServer = await getFullData();
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        posts: fullPostsFromServer,
        visiblePosts: fullPostsFromServer,
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  };

  filterPhrase = (event) => {
    const filters = event.target.value.toLowerCase();

    this.setState(prevState => ({
      visiblePosts: prevState.posts.filter(post => (
        post.title.toLowerCase().includes(filters)
          || post.body.toLowerCase().includes(filters)
      )),
    }));
  }

  render() {
    const { visiblePosts } = this.state;

    return (
      <main>
        { this.state.isLoaded ? (
          <div className="App">
            <input
              type="text"
              placeholder="filter by name, mother and father"
              onInput={this.filterPhrase}
            />
            <h1>Dynamic list of posts</h1>
            <PostList posts={visiblePosts} />
          </div>
        ) : (
          <button type="button" className="load" onClick={this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
}

export default App;
