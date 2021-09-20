import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getPosts, getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';

type Props = {
  selectPost: (postId: number) => void;
  selectPostId: number;
  selectUserId: number;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectPost, selectPostId, selectUserId } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (selectUserId === 0) {
      getPosts()
        .then(response => {
          setPosts(response);
          setLoader(false);
        });

      return;
    }

    getUserPosts(selectUserId)
      .then(response => {
        setPosts(response);
        setLoader(false);
      });
  }, [selectUserId]);

  const handleChange = (id: number) => {
    if (selectPostId === id) {
      selectPost(0);
    } else {
      selectPost(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loader && (
        <Loader />
      )}
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleChange(post.id)}
            >
              {selectPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
