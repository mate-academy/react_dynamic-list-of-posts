import React, { FC, useState, useMemo, useEffect } from 'react';
import { PreparedPost } from '../../interfaces';
import { Post } from '../Post/Post';
import { getFilteredPosts } from '../../utils/filterTodos';
import './PostList.css';
import { Input } from '../Input/Input';
import { useDebounce } from '../../utils/debouncer';

interface Props {
  posts: PreparedPost[];
}

export const PostList: FC<Props> = ({ posts }) => {
  const [filter, setFilter] = useState<string>('');
  const [debouncedFilter, setDebouncedFilter] = useState<string>('');

  const memoPosts = useMemo(() => {
    return getFilteredPosts(posts, filter);
  }, [posts, filter]);

  const searchTerm = useDebounce(filter);

  useEffect(() => {
    setDebouncedFilter(searchTerm);
  }, [searchTerm]);

  return (
    <div className="post-list">
      <Input
        value={debouncedFilter}
        onChange={(({ target }) => setFilter(target.value))}
      />
      {
        memoPosts.map(memoPost => <Post content={memoPost} key={memoPost.post.id} />)
      }
    </div>

  );
};
