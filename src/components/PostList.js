import React from 'react';
import Post from './Post';
import {getComments, getPosts, getUsers} from './utils';

class PostList extends React.Component {
  state = {
    posts: [],
    postsFiltered: [],
    requested: false,
    loaded: false,
    filterValue: '',
  };

  loadData = () => {
    this.setState({
      requested: true,
    });

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([ posts, users, comments ]) => {
        this.setState({
          posts: posts.map(post => ({
            ...post,
            user: users.find(user => user.id === post.userId),
            comments: comments.filter(comment => comment.postId === post.id),
          })),
          loaded: true,
          requested: false,
        });
      });
  };

  filter = (e) => {
    const val = e.target.value;
    const filteredPosts = this.state.posts.filter(post =>
      post.title.includes(val)
      ||
      post.body.includes(val));
    this.setState( {
      postsFiltered: filteredPosts,
      filterValue: val,
    });
  };

  render() {
    const {filterValue, postsFiltered, posts} = this.state;
    if(this.state.requested) {
      return <h3>Loading...</h3>;
    }

    if(!this.state.loaded) {
      return <button className={'btn btn-outline-dark btn-lg'} onClick={this.loadData}>Load Posts</button>;
    }

    return (
      <section>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Введите значение"
            onChange={this.filter}
          />
          {filterValue.length > 0
            ? postsFiltered.map(post => <Post key={post.id} {...post} />)
            : posts.map(post => <Post key={post.id} {...post} />)
          }
          {postsFiltered.length < 1 ? <span>Ничего не найдено</span> : null}
        </div>
      </section>
    );
  }
};

export default PostList;
