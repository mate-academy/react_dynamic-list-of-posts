import React from 'react';
import './PostList.css';
import Comments from './components/Comments';
import Posts from './components/Posts';
import Users from './components/Users';

const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json());

const getComments = () => fetch('https://jsonplaceholder.typicode.com/comments')
  .then(res => res.json());

const getUsers = () => fetch(' https://jsonplaceholder.typicode.com/users')
  .then(res => res.json());

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      posts: [],
    };
  }

  async componentDidMount() {
    const posts = await getPosts();
    const comments = await getComments();
    const users = await getUsers();
    this.setState({
      posts: this.getFullPost(posts, comments, users),
      isLoaded: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getFullPost(posts, comments, users) {
    return posts.map(post => ({
      ...post,
      comments: comments.filter(comment => comment.postId === post.id),
      user: users.find(user => user.id === post.userId),
    }));
  }

  render() {
    const { posts, isLoaded } = this.state;
    return (
      <div className="PostList">
        <h1>Statick Post List</h1>
        {isLoaded ? (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Posts post={post} />
                <Users post={post} />
                <Comments post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )

        }

      </div>
    );
  }
}

export default PostList;
