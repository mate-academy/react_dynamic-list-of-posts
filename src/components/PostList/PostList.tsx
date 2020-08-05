import React, { FC, useState, useMemo } from 'react';
import { PreparedPost } from '../../interfaces';
import { Post } from '../Post/Post';
import { getFilteredPosts } from '../../utils/filterTodos';
import './PostList.css';

interface Props {
  posts: PreparedPost[];
}

export const PostList: FC<Props> = ({ posts }) => {
  const [filter, setFilter] = useState<string>('');

  const memoPosts = useMemo(() => {
    return getFilteredPosts(posts, filter);
  }, [posts, filter]);

  return (
    <div className="post-list">
      <input
        type="text"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
        className="form-control"
        placeholder="Filter posts by title or body"
      />
      {
        memoPosts.map(memoPost => <Post content={memoPost} key={memoPost.post.id} />)
      }
    </div>

  );
};
