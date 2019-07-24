import React from 'react';
import './App.css';
import GetDataJson from './GetDataJson';
import ListOfPosts from './ListOfPosts';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      postsUserComments: [],
      users: [],
      posts: [],
      comments: [],
      lastCommentId: 0,
      loadBTN: '!!! Load !!!',
      changeStatus: 0,
    };
  }

  handleLoadBTNClick = async() => {
    this.setState({
      loadBTN: 'Loading ...',
    });

    const users = await GetDataJson('https://jsonplaceholder.typicode.com/users');
    const posts = await GetDataJson('https://jsonplaceholder.typicode.com/posts');
    const comments = await GetDataJson('https://jsonplaceholder.typicode.com/comments');

    await this.setState({
      posts: [...posts],
      users: [...users],
      comments: [...comments],
      lastCommentId: comments.map(comment => comment.id)
        .sort((a, b) => a.id - b.id)[comments.length - 1],
    });

    this.createPUCArray();

    this.setState({
      loadBTN: 'Loaded',
    });
  }

  // PUC-Array means array of { (P)ost with (U)ser with (C)omments }.
  createPUCArray = () => {
    const initialPostsUserComment = this.state.posts.map(post => (
      {
        ...post,
        user: this.state.users.find(user => user.id === post.userId),
        comments: this.state.comments.filter(comment => comment.postId === post.id).reverse(),
      }
    ));

    this.setState(prevState => (
      {
        changeStatus: prevState.changeStatus + 1,
        postsUserComments: [...initialPostsUserComment],
      }
    ));
  }

  addComment = async(postId, name, email, comment) => {
    await this.setState(prevState => ({
      comments:
      [
        ...prevState.comments,
        {
          postId: postId,
          id: prevState.lastCommentId + 1,
          name: name,
          email: email,
          body: comment,
        },
      ],
      lastCommentId: prevState.lastCommentId + 1,
    }));

    this.createPUCArray();
  }

  render() {
    return (
      <div className="App">
        {this.state.loadBTN !== 'Loaded'
          ? (
              <>
                <h1>Dynamic list of posts</h1>
                <button onClick={this.handleLoadBTNClick}>
                  {this.state.loadBTN}
                </button>
              </>
            )
          : (
              <>
                <h3>
                  Once upon a time in a very ancient<br />
                  and extremely outdated forum <br />
                  that no one has visited for decades ...<br />
                  or even centuries...
                </h3>

                <ListOfPosts
                  postList={this.state.postsUserComments}
                  addCommentHandler={this.addComment}
                  changeStatus={this.state.changeStatus}
                />
              </>
            )
        }
      </div>
    );
  }
}

export default App;
