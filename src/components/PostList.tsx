import React from 'react';
import { Post } from './Post';

interface Props {
  posts: PreparedPosts;
  onInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

export const PostList: React.FC<Props> = ({ posts, onInputChange, inputValue }) => {
  return (
    <div className="post-list">
      {/* Добавил htmlFor, потому что линтер ругается */}
      <label
        className="label"
        htmlFor="search"
      >
        Search:
        <input
          type="text"
          className="input"
          placeholder="Search post title or body"
          id="search"
          value={inputValue}
          onChange={onInputChange}
        />
      </label>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
