import React, { FC, ChangeEvent } from 'react';
import { Post } from './Post';

interface Props {
  posts: PostWithUser[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

export const PostsList: FC<Props> = ({ posts, onChange, inputValue }) => (
  <>
    <form className="form">
      <label htmlFor="filter">
        Enter a keyword:
        <br />
        <input
          id="filter"
          className="form-control"
          name="filter"
          type="text"
          value={inputValue}
          onChange={onChange}
          placeholder="Input text here"
        />
      </label>
    </form>
    <ul className="posts__list">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  </>
);
