import React from 'react';
import '../App.css';
import Post from './Post';

const PostList = ({posts, filterBy, value}) => (
  <div className="post-list">
    <label className="label">
      Filter by &nbsp;
      <input
        onInput={filterBy}
        className="input"
        type="text"
        placeholder="Enter text"
        value={value}
      />
    </label>
    <div>
      {posts.map(post => (
        <div
          className="post"
          key={post.id}
        >
          <Post
            post={post}
          />
        </div>
      ))}
    </div>
  </div>
)

export default PostList;