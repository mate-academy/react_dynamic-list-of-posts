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
      <div className="form-group">
        <label htmlFor="filter">
          Filter by:
          <br />
          <input
            id="filter"
            className="form-control"
            name="filter"
            type="text"
            value={inputValue}
            onChange={onChange}
            placeholder="enter word ..."
          />
        </label>
      </div>
    </form>
    <ul className="list-group">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  </>
);
