import React from 'react';
import './PostList.css';
import { Post } from '../Post/Post';

interface Props {
  posts: PreparedPosts;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

export const PostList: React.FC<Props> = ({ posts, onInputChange, inputValue }) => (
  <div className="posts">
    <div className="posts__search-wrapper">
      <label htmlFor="search-field">
        <span className="posts__search">Search: </span>
        <input
          className="posts__input"
          type="text"
          placeholder="Search title or body"
          id="search-field"
          onChange={onInputChange}
          value={inputValue}
        />
      </label>
    </div>
    {posts.map(post => (
      <Post key={post.id} postInfo={post} />
    ))}
  </div>
);
