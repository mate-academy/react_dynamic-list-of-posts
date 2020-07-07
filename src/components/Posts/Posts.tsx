import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { fetchData } from '../../api/api';
import { Preloader } from '../common/Preloader';
import { PostsList } from '../PostsList';
import { PostInterface, PostOriginalInterface } from '../../interfaces/PostInterface';
import { UserInterface } from '../../interfaces/UserInterface';
import { CommentInterface } from '../../interfaces/CommentInterface';
import { FilterField } from '../FilterField/FilterField';

export const Posts: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<PostInterface[]>([]);

  const load = async () => {
    setIsLoading(true);

    const users = await fetchData('users');
    const postsFromServer = await fetchData('posts');
    const comments = await fetchData('comments');

    setPosts(postsFromServer.map((post: PostOriginalInterface) => ({
      ...post,
      user: users.find((person: UserInterface) => person.id === post.userId),
      comments: comments.filter((comment: CommentInterface) => comment.postId === post.id),
    })));

    setIsFetched(true);
  };

  useEffect(() => {
    setVisiblePosts([...posts]);
  }, [posts]);

  const handleChange = debounce((value: string) => {
    setVisiblePosts(posts
      .filter((post: PostInterface) => (
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
