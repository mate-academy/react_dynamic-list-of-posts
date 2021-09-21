import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';
import { getAllPosts, getUserPosts } from '../../api/posts';

interface Props {
  selectedUserId: number;
  selectedPostId: number;
  changePostId: (selectPost: number) => void;
}

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, changePostId } = props;
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(false);
    if (selectedUserId === 0) {
      getAllPosts()
        .then(data => {
          setPosts(data);
          setLoader(true);
        });

      return;
    }

    getUserPosts(selectedUserId)
      .then(postsFromServer => {
        setPosts(postsFromServer);
        setLoader(true);
      });
  }, [selectedUserId]);

  if (!posts) {
    return (
      <div>Post not found</div>
    );
  }

  const handleChange = (postId: number) => {
    if (selectedPostId === postId) {
      changePostId(0);
    } else {
      changePostId(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts.length === 0 && (
        <h3>Selected user has not posted anything yet</h3>
      )}
      {
        loader ? (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div>
                  <b>{`[User#${post.userId}]: `}</b>
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => (
                    handleChange(post.id)
                  )}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}

                </button>
              </li>
            ))}
          </ul>
        )

          : <Loader />
      }
    </div>
  );
};
