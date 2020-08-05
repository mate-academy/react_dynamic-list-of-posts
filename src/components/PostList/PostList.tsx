import React, { FC, useState, useMemo } from 'react';
import { PreparedPost } from '../../interfaces';
import { Post } from '../Post/Post';
import { getFilteredPosts } from '../../utils/filterTodos';
import './PostList.css';
import { Input } from '../Input/Input';

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
      <Input
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
      {
        memoPosts.map(memoPost => <Post content={memoPost} key={memoPost.post.id} />)
      }
    </div>

  );
};
