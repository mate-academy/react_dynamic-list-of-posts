import React, { useEffect, useState } from 'react';
import { getAllPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

interface Props {
  selectedUserID: number;
  changePostId: (postId: number) => void;
  // postChoose: (isChoosed: boolean) => void;
  selectedPostId: number;
}

export const PostsList: React.FC<Props> = (props) => {
  const {
    selectedUserID, changePostId, selectedPostId,
  } = props;
  const [userID, setUserID] = useState(selectedUserID);
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    setUserID(selectedUserID);

    if (userID === 0) {
      getAllPosts()
        .then(response => setPosts(response));
    } else {
      getUserPosts(selectedUserID)
        .then(response => setPosts(response));
    }

    // eslint-disable-next-line no-console
    console.log('refresh post list');
  }, [selectedUserID]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={(event) => {
                event.preventDefault();
                if (post.id === selectedPostId) {
                  changePostId(0);
                }

                changePostId(post.id);
                // postChoose();
              }}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
