import React, { Component } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

class App extends Component {
  state ={
    userId: 0,
    postId: 0,
    isPostChosen: false,
  };

  handleChoseUser = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
    });
  };

  handleOpenPost = (id) => {
    if (this.state.postId === id && this.state.isPostChosen) {
      this.setState({ isPostChosen: false });
    } else {
      this.setState({
        postId: id,
        isPostChosen: true,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <label>
            Select a user: &nbsp;

            <select
              className="App__user-selector"
              value={this.state.userId}
              name="userId"
              onChange={this.handleChoseUser}
            >
              <option value="0">All users</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Leanne Graham</option>
            </select>
          </label>
        </header>

        <main className="App__main">
          <div className="App__sidebar">
            <PostsList
              onOpen={this.handleOpenPost}
              user={this.state.userId}
              isPostChosen={this.state.isPostChosen}
              selectedPost={this.state.postId}
            />
          </div>

          <div className="App__content">
            {this.state.isPostChosen
            && <PostDetails postId={this.state.postId} />}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
