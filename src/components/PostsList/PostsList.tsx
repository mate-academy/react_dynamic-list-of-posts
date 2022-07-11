import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type Props = {
  userId: number;
  selectedPostId: number;
  openClosePost: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({
  userId,
  selectedPostId,
  openClosePost,
}) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [errorMess, setErrorMess] = useState<string>('');

  useEffect(() => {
    setErrorMess('');
    setPosts(null);

    getUserPosts(userId)
      .then((postsFromServ: Post[]) => (
        postsFromServ.length > 0
          ? setPosts(postsFromServ)
          : setErrorMess(`User #${userId} has no posts`)
      ));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {errorMess.length > 0
        && <p>{errorMess}</p>}

      <ul className="PostsList__list" data-cy="postDetails">
        {posts
          && posts.map(post => (
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
                className={
                  selectedPostId !== post.id
                    ? 'PostsList__button button'
                    : 'PostsList__button button button--active'
                }
                onClick={() => openClosePost(post.id)}
              >
                {selectedPostId !== post.id
                  ? 'Open'
                  : 'Close'}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
