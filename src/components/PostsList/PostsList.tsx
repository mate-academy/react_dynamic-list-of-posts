/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../react-app-env';
import './PostsList.scss';

interface Props {
  userId: string;
  selectPost: (arg0?: Post) => void;
  post?: Post;
}

export const PostsList: React.FC<Props> = ({ userId, selectPost, post }) => {
  const [currentPostList, setPostList] = useState<Post[]>([]);

  async function finder() {
    const result = await getUserPosts(userId);

    setPostList(result);
  }

  useEffect(() => {
    finder();
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {
          currentPostList.map(singlePost => (
            <li className="PostList__item">
              <div>
                <b>{`[User] #${singlePost.userId} `}</b>
                {singlePost.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if ((post) && (post.id === singlePost.id)) {
                    selectPost(undefined);
                  } else {
                    selectPost(singlePost);
                  }
                }}
              >
                {post && (post.id === singlePost.id)
                  ? 'close'
                  : 'open'}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
