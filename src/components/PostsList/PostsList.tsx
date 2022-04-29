import { FC, useEffect, useState } from 'react';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';
import { Loader } from '../Loader';

interface Props {
  userId: number,
  onSelect: (postId: number) => void,
  selectedPostId: number,
  isLoadPost: boolean,
}

export const PostsList: FC<Props> = (
  {
    userId,
    onSelect,
    selectedPostId,
    isLoadPost: load,
  },
) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (userId === 0) {
      getPosts().then(data => {
        setPosts(data);
      });
    } else {
      getUserPosts(userId).then(
        data => {
          setPosts(data);
        },
      );
    }
  }, [userId]);

  const isOpened = (postId: number) => selectedPostId === postId;

  const postDetailsToggle = (postId: number) => {
    if (isOpened(postId)) {
      onSelect(0);
    } else {
      onSelect(postId);
    }
  };

  return (
    <>
      <div className="PostsList">
        <h2>Posts:</h2>
        {posts.length ? (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li className="PostsList__item" key={post.id}>
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => postDetailsToggle(post.id)}
                >
                  {isOpened(post.id) ? 'Close' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            {load ? <Loader /> : <h3>User has no posts</h3>}
          </>
        )}
      </div>
    </>
  );
};
