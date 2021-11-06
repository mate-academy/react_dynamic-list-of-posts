import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/posts';
import './PostsList.scss';

type Post = {
  id: number;
  userId: number;
  title: string;
  selectedPostId: number;
};

type Props = {
  selectedUserId: string;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  setSelectedPostId,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts()
      .then((responce) => {
        let res = responce;

        if (selectedUserId !== '') {
          res = res.filter((el: Post) => el.userId === +selectedUserId);
        }

        setPosts(res);
      });
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => (
          <li className="PostsList__item">
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                setSelectedPostId((selectedPostId !== post.id) ? post.id : 0);
              }}
            >
              {selectedPostId !== post.id ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
