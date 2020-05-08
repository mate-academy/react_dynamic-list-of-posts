import React from 'react';
import './App.scss';
import { AppState, Post } from './components/interfaces';
import { preparedDatas } from './components/getPosts';
import { DownloadButton } from './components/DownloadButton';
import { PostsList } from './components/PostsList';

class App extends React.PureComponent {
  state: AppState = {
    posts: [],
    isLoading: false,
    isLoaded: false,
    downloadError: false,
    filteredValue: '',
    searchValue: '',
  };

  debounce = (f: Function, delay: number) => {
    // Не знаю, как описать setTimeout, как функцию - нельзя.
    let timerId: any = null;

    const debounced = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => f(), delay);
    };

    return debounced;
  };

  field = (e: React.ChangeEvent<HTMLInputElement>) => {
    const letter = e.target.value;

    this.setState({ searchValue: letter });
  };

  filterPost = () => {
    const { filteredValue, posts } = this.state;

    if (!filteredValue) {
      return posts;
    }

    return posts
      .filter(post => (post.title + post.body)
        .replace(/\s*/g, '')
        .includes(filteredValue
          .replace(/\s*/g, '')));
  };

  startSearch = () => {
    const { searchValue } = this.state;

    this.setState({ filteredValue: searchValue });
  };

  wrapper = this.debounce(this.startSearch, 1000);

  dataGeneration = () => {
    this.setState({ isLoading: true });

    preparedDatas()
      .then(allPosts => this.setState(() => ({
        posts: allPosts, isLoaded: true, downloadError: false,
      })))
      .catch(() => this.setState(() => ({ downloadError: true })))
      .finally(() => this.setState(() => ({ isLoading: false })));
  };

  render() {
    const {
      isLoading, isLoaded, searchValue, downloadError,
    } = this.state;
    const filteredPosts: Post[] = this.filterPost();

    return (
      <>
        <h1 className="title">Posts</h1>
        {!isLoaded
          && <DownloadButton isLoading={isLoading} dataGeneration={this.dataGeneration} />}
        {downloadError && (
          <p className="error">Loading error, please, try again.</p>
        )}
        {isLoaded && (
          <>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                placeholder="write a text for search"
                value={searchValue}
                onChange={(e) => {
                  this.wrapper();
                  this.field(e);
                }}
              />
            </div>
            <PostsList posts={filteredPosts} />
          </>
        )}
      </>
    );
  }
}

export default App;
