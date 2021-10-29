import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/posts';
import { getUserPosts } from '../../api/users';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Current = (current: boolean) => boolean;

type Props = {
  selectedUserId: number;
  selectedPostId: number;
  setSelectedPostId: (postId: number) => void;
  areDetailsShown: (fn: Current) => void;
  postDetailsAreShown: boolean;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  setSelectedPostId,
  areDetailsShown,
  postDetailsAreShown,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = () => {
    getPosts()
      .then((postsFromServer: Post[]) => {
        setPosts(postsFromServer);
      });
  };

  const loadUserPosts = () => {
    if (selectedUserId) {
      getUserPosts(selectedUserId)
        .then((postsFromServer: Post[]) => {
          setPosts(postsFromServer);
        });
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    loadUserPosts();
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">

        {posts.map((post: Post) => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`[User ${post.userId}}]:`}
              </b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                areDetailsShown(current => {
                  if (selectedPostId !== post.id) {
                    return true;
                  }

                  return !current;
                });
                setSelectedPostId(post.id);
              }}
            >
              {(selectedPostId === post.id && postDetailsAreShown)
                ? 'close'
                : 'open'}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};
