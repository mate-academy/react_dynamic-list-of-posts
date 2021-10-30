import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../react-app-env';
import './PostsList.scss';

interface Props {
  userId:number,
  setSelectedPostId:(postId:number) => void
}
export const PostsList: React.FC<Props> = ({ userId, setSelectedPostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePostId, setActivePostId] = useState(0);

  useEffect(() => {
    getUserPosts(userId).then(posts1 => setPosts(posts1));
  }, [userId]);
  const buttonHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    const currentPostId = event.currentTarget.id;

    if (+currentPostId === activePostId) {
      setSelectedPostId(0);
      setActivePostId(0);

      return;
    }

    setSelectedPostId(+currentPostId);
    setActivePostId(+currentPostId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              id={`${post.id}`}
              className="PostsList__button button"
              onClick={buttonHandler}
            >
              {activePostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
