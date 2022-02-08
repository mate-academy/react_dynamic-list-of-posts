import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  userId: number,
  onChoose: (id: number) => void,
};

export const PostsList: React.FC<Props> = ({ userId, onChoose }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const loadPosts = async () => {
    let userPosts;

    switch (userId) {
      case 0:
        userPosts = await getPosts();
        break;
      default:
        userPosts = await getUserPosts(userId);
        break;
    }

    setPosts(userPosts);
  };

  const handleClickButton = (postId: number) => {
    if (postId !== selectedPostId) {
      onChoose(postId);
      setSelectedPostId(postId);
    } else {
      onChoose(0);
      setSelectedPostId(0);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts.length > 0 ? (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                  { 'PostsList__button--selected': post.id === selectedPostId },
                )}
                onClick={() => handleClickButton(post.id)}
              >
                {post.id === selectedPostId ? (
                  <>
                    Close
                  </>
                ) : (
                  <>
                    Open
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts</p>
      )}

    </div>
  );
};
