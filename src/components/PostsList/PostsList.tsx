/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUserPostsByID, getUsersPosts } from '../../api/posts';

type Props = {
  selectedPostId: number | null;
  user: User | null;
  selectValue: string;
  handleOpenPostDetails: (id: number) => void;
  getPostFromServerByID: () => Promise<void>;
};

export const PostsList: React.FC<Props> = React.memo(({
  user,
  selectedPostId,
  selectValue,
  handleOpenPostDetails,
  getPostFromServerByID,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostListLoading, setPostListLoading] = useState(false);

  const getPostsFromServer = useCallback(async () => {
    try {
      const allPosts = await getUsersPosts();

      setPostListLoading(false);
      setPosts(allPosts);
    } catch (error) {
      setPosts([]);
    }
  }, []);

  const getPostsFromServerByID = useCallback(async () => {
    try {
      if (user !== null) {
        const userPosts = await getUserPostsByID(user.id);

        setPosts(userPosts);
        setPostListLoading(false);
      }
    } catch (error) {
      setPosts([]);
      setPostListLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setPostListLoading(true);
    if (selectValue === 'All users') {
      getPostsFromServer();

      return;
    }

    getPostsFromServerByID();
    setPostListLoading(false);
  }, [user]);

  useEffect(() => {
    getPostFromServerByID();
  }, [selectedPostId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleOpenPostDetails(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}

        {isPostListLoading && (
          <Loader />
        )}
      </ul>

    </div>
  );
});
