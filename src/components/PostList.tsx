import React, {
  FC, useState, useCallback, useMemo, ChangeEvent,
} from 'react';
import debounce from 'lodash/debounce';
import { User } from './User';
import { CommentList } from './CommentList';
import { SearchPost } from './SearchPost';

export const PostList: FC<Posts> = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [filteredQuery, setFilteredQuery] = useState('');

  const visiblePosts = useMemo(() => {
    const filteredPosts = [...posts].filter(post => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return (title + body).includes(filteredQuery.toLowerCase());
    });

    return filteredPosts;
  }, [posts, filteredQuery]);

  const setFilteredQueryWithDebounce = useCallback(
    debounce(setFilteredQuery, 1000),
    [],
  );

  const handleSearch = useCallback(({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;

    setQuery(value);
    setFilteredQueryWithDebounce(value);
  }, [setFilteredQueryWithDebounce]);

  return (
    <>
      <SearchPost onSearch={handleSearch} query={query} />
      <article className="app__post-list">
        {visiblePosts.map(({
          id, title, user, body, comments,
        }) => (
          <section className="post" key={id}>
            <h5 className="post__title">{title}</h5>
            <p className="post__body">{body}</p>
            <User {...user} />
            <p className="comment__heading">Comments</p>
            <CommentList comments={comments} />
          </section>
        ))}
      </article>
    </>
  );
};
