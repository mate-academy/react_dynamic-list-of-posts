import { FC, useEffect, useState } from 'react';

import './PostsList.scss';

import { getUserPost } from '../../api/posts';
import { Loader } from '../Loader';

type Props = {
  currentUserId: number,
  postId: number,
  onChangePostId: (id: number) => void,
};

export const PostsList: FC<Props> = (
  {
    currentUserId,
    postId,
    onChangePostId,
  },
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUserPost(currentUserId)
      .then(postsList => {
        setPosts(postsList);
        setIsLoaded(true);
      });
  }, [currentUserId]);

  if (!isLoaded) {
    return (<Loader />);
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {!posts.length && (
        <p>Nothing was found for this user</p>
      )}
      <ul>
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                onChangePostId(postId === post.id ? 0 : post.id);
              }}
            >
              {postId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
