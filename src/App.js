import React, { Component } from 'react';
import './App.css';
import data from './components/Api';
import PostList from './components/PostList';
import Load from './components/Load';
import InputForm from './components/InputForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialTable: null,
      currentTable: null,
      loading: false,
      posts: null,
      users: null,
      comments: null,
    };
  }

  showList = async() => {
    this.setState({
      loading: true,
    });

    const [posts, users, comments] = await data();

    const postList = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      initialTable: postList,
      currentTable: postList,
      posts: postList,
      users: postList.users,
      comments: postList.comments,
    });
  };

  filtering = (val) => {
    if (val) {
      const table = this.state.currentTable;
      const filterTable = table
        .filter(
          item => item.body.includes(val)
            || item.title.includes(val)
        );

      this.setState({
        currentTable: filterTable,
      });
    } else {
      this.setState(prev => ({
        currentTable: prev.initialTable,
      }));
    }
  }

  rendering = () => {
    const {
      posts, users, comments, loading,
    } = this.state;

    if (users === null && posts === null && comments === null) {
      if (loading) {
        return <button className="ui loading primary button">Loading</button>;
      }

      return <Load showList={this.showList} />;
    }

    return (
      <>
        <InputForm
          filtering={this.filtering}
        />
        <PostList
          posts={this.state.currentTable}
        />
      </>
    );
  }

  render() {
    return (
      <div className="wrap">{this.rendering()}</div>
    );
  }
}
export default App;
