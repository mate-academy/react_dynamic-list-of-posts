import React, { useCallback, useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import './PostsList.scss';

interface Props {
  selectedUser: string,
  selectedPostId: number | null,
  handleSelectedPost: (postId: number) => void,
}

export const PostsList: React.FC<Props> = ({
  selectedUser,
  selectedPostId,
  handleSelectedPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  const getPosts = useCallback(async () => {
    const userPosts = await getUserPosts(+selectedUser);

    setPosts(userPosts);
    setIsPostLoaded(true);
  }, [selectedUser]);

  useEffect(() => {
    getPosts();
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {!isPostLoaded && <Loader />}
        {isPostLoaded && posts.map(post => {
          const isOpen = selectedPostId === post.id;

          return (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleSelectedPost(post.id)}
              >
                {isOpen ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
