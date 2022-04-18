import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import './PostsList.scss';

interface Props {
  selectedUserId: number;
  onSelect: (postId: number) => void;
  selectedPostId: number;
}

export const PostsList: React.FC<Props> = React.memo(
  ({
    selectedUserId, onSelect, selectedPostId,
  }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      const loadPosts = () => {
        getUserPosts(selectedUserId)
          .then(loadedPosts => setPosts(loadedPosts));
      };

      loadPosts();
    }, [selectedUserId]);

    return (
      <div className="PostsList">
        <h2>Posts:</h2>

        {posts.length
          ? (
            <ul className="PostsList__list">
              {posts.map(({ title, userId, id }) => (
                <li
                  className="PostsList__item"
                  key={id}
                >
                  <div>
                    <b>
                      {`[User #${userId}]: `}
                    </b>
                    {title}
                  </div>
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={id !== selectedPostId
                      ? () => onSelect(id)
                      : () => onSelect(0)}
                  >
                    {
                      id !== selectedPostId
                        ? <p>Open &#9658;</p>
                        : <p>Close &#9668;</p>
                    }
                  </button>
                </li>
              ))}
            </ul>
          )
          : (
            <p>Not posts yet</p>
          )}
      </div>
    );
  },
);
