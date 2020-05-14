import React, { FC } from 'react';
import { User } from './User';
import { CommentList } from './CommentList';
import { SearchPost } from './SearchPost';
import { usePostList } from './hooks/usePostList';

export const PostList: FC<PostListProps> = (props) => {
  const {
    query,
    handleSearch,
    visiblePosts
  } = usePostList(props);

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
