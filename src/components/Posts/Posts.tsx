import React, { useState, useEffect, FC } from 'react';
import debounce from 'lodash/debounce';
import { fetchData } from '../../api/api';
import { Preloader } from '../common/Preloader';
import { PostsList } from '../PostsList';
import { PostInterface } from '../../interfaces/PostInterface';
import { UserInterface } from '../../interfaces/UserInterface';
import { CommentInterface } from '../../interfaces/CommentInterface';
import { FilterField } from '../FilterField/FilterField';

export const Posts: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFetched, setFetched] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<PostInterface[]>([]);

  const load = async () => {
    setLoading(true);

    const users = await fetchData<UserInterface>('users');
    const postsFromServer = await fetchData<PostInterface>('posts');
    const comments = await fetchData<CommentInterface>('comments');

    setPosts(postsFromServer.map((post) => ({
      ...post,
      user: users.find((person) => person.id === post.userId),
      comments: comments.filter((comment) => comment.postId === post.id),
    })));

    setFetched(true);
  };

  useEffect(() => {
    setVisiblePosts([...posts]);
  }, [posts]);

  const handleChange = debounce((value: string) => {
    setVisiblePosts(posts
      .filter((post) => (
        post.title.includes(value) || post.body.includes(value)
      )));
  }, 1000);

  if (!isFetched) {
    return (
      <div className="control">
        <button
          type="button"
          className="btn btn-large red control__button"
          onClick={load}
        >
          Load
        </button>
        {
          isLoading && <Preloader />
        }
      </div>
    );
  }

  return (
    <>
      <form className="form">
        <FilterField handleChange={handleChange} />
      </form>
      <PostsList posts={visiblePosts} />
    </>
  );
};
