import React, { useState, useEffect } from 'react';
import { getAllPosts, getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

interface Props {
  selectedUserId: number;
  selectedPostId: number;
  selectPost: (postId :number) => void;
}

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectPost, selectedPostId } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (selectedUserId === 0) {
      getAllPosts()
        .then(postsFromServer => {
          setPosts(postsFromServer);
          setIsLoading(false);
        });

      return;
    }

    getUserPosts(selectedUserId)
      .then(postsFromServer => {
        setPosts(postsFromServer);
        setIsLoading(false);
      });
  }, [selectedUserId]);

  const handleClick = (id: number) => (
    id === selectedPostId
      ? selectPost(0)
      : selectPost(id)
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts.length === 0 && (
        <h3>Selected user has not posted anything yet :(</h3>
      )}

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleClick(post.id)}
            >
              {selectedPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
