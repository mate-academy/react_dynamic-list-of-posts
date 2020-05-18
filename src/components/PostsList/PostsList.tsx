import React, { FC, ChangeEvent } from 'react';
import { Post } from '../Post/Post';

interface Props {
  posts: PostWithUser[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

export const PostsList: FC<Props> = ({ posts, onChange, inputValue }) => (
  <>
    <form>
      <label htmlFor="search">
        Search:
        <input
          id="search"
          name="search"
          type="text"
          value={inputValue}
          onChange={onChange}
          placeholder="enter search word..."
        />
      </label>
    </form>
    <ul className="posts-container">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  </>
);
