import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../react-app-env';
import './PostsList.scss';

type Props = {
  userId: string;
  onPostIdHandler: (postId: number | null) => void,
  selectedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({
  userId, onPostIdHandler, selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const userPosts = async () => {
    const postItems = await getUserPosts(+userId);

    setPosts(postItems);
  };

  useEffect(() => {
    userPosts();
  }, [userId]);

  const clickHandler = (postId: number) => {
    if (selectedPostId !== postId) {
      onPostIdHandler(postId);
    } else {
      onPostIdHandler(null);
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`User# ${post.userId}`}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => clickHandler(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
