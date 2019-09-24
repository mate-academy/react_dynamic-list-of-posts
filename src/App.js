import React from 'react';

import './App.css';
import PostsList from './components/PostsList/PostsList';

class App extends React.Component{
  state = {
    active:0,
    titleFilt:0,
    userFilt:0,
    usersPostsWithComments:[],
    usersPostsWithCommentsSorted:[]
  }

  loadDatas = () => {
    Promise.all([
     fetch('https://jsonplaceholder.typicode.com/users').then(users => users.json()),
     fetch('https://jsonplaceholder.typicode.com/posts').then(posts => posts.json()),
     fetch('https://jsonplaceholder.typicode.com/comments').then(comments => comments.json()),
 ])
    .then(data => {
      const modifiedArray = data[1].map(post => ({
        ...post,
        user: data[0].find(user => user.id === post.userId),
        comments: data[2].filter(comments => comments.postId === post.id),
      }));
      this.setState({
        active:1,
        usersPostsWithComments: modifiedArray,
        usersPostsWithCommentsSorted: modifiedArray,
      })
    })
  }

  sortTitle = () => {
    this.setState(prevState => (
      this.state.titleFilt === 0
      ? {
        usersPostsWithCommentsSorted: [...prevState.usersPostsWithComments]
        .sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0 ),
        titleFilt: 1,
      }
      : {
        usersPostsWithCommentsSorted: [...prevState.usersPostsWithCommentsSorted]
        .reverse(),
        titleFilt: 0,
      }
    ));
  }

  sortUserText = () => {
    this.setState(prevState => (
      this.state.userFilt === 0
      ? {
        usersPostsWithCommentsSorted: [...prevState.usersPostsWithComments]
        .sort((a,b) => a.body < b.body ? -1 : a.body > b.body ? 1 : 0 ),
        userFilt: 1,
      }
      : {
        usersPostsWithCommentsSorted: [...prevState.usersPostsWithCommentsSorted]
        .reverse(),
        userFilt: 0,
      }
    ))
  }

  render () {
    const { usersPostsWithCommentsSorted, active } = this.state;
    return (
      <div className="App">
        <h1>Static list of posts</h1>
        <div className={active === 1 ? 'button-back down' : 'button-back' }>Loading...</div>

        <button
          onClick={this.loadDatas}
          className={active === 1 ? 'button-start down' : 'button-start' }
          type="button"
        >Load</button>

        {!!active && (<button
          type="button"
          className="sort sort-left"
          onClick={this.sortTitle}
        >Title A-Z</button>)}

        {!!active && (<button
          type="button"
          className="sort"
          onClick={this.sortUserText}
        >Text A-Z</button>)}
        <PostsList posts={usersPostsWithCommentsSorted} />
      </div>
    );
  }
}

export default App;
