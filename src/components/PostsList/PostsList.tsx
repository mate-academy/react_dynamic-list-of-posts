import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';

type Props = {
  selectedUser: string;
  handleSelectedPost: (id: number) => void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  handleSelectedPost,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  const getPosts = useCallback(async () => {
    const userPosts = await getUserPosts(+selectedUser);

    setPosts(userPosts);
    setIsPostsLoaded(true);
  }, [selectedUser]);

  useEffect(() => {
    getPosts();
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {!isPostsLoaded && <Loader />}
        {isPostsLoaded && posts.map((post) => {
          const isOpen = selectedPostId === post.id;

          return (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button', 'button',
                  {
                    'PostsList__user-button': isOpen,
                  },
                )}
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
