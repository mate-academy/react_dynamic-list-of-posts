/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../react-app-env';
import './PostsList.scss';

interface Props {
  userId: number; // current user id
  selectPostId: (arg0: number | null) => void; // lifting state up, choosing selected post
  post: number | null; // displayed post
}

export const PostsList: React.FC<Props> = ({ userId, selectPostId, post }) => {
  const [currentPostList, setPostList] = useState<Post[]>([]);

  async function finder() { // async function to get array of posts of currentUser
    const result = await getUserPosts(userId);

    setPostList(result);
  }

  useEffect(() => { // if user changed make new request to server, to get new array of posts
    finder();
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {
          currentPostList.map(singlePost => ( // making list of posts list
            <li className="PostList__item">
              <div>
                <b>{`[User] #${singlePost.userId} `}</b>
                {singlePost.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => { // button to open/close posts using setState
                  if ((post) && (post === singlePost.id)) {
                    selectPostId(null);
                  } else {
                    selectPostId(singlePost.id);
                  }
                }}
              >
                {post && (post === singlePost.id)
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
