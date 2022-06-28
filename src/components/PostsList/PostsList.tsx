import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getAllPosts, getPosts } from '../../api/posts';
import { Post } from '../../react-app-env';

type Props = {
  userSelectedId: string;
  selectPostId: (arg?: number) => void;
  postId: number | undefined;
  setIsLoading: (arg: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  userSelectedId,
  selectPostId,
  postId,
  setIsLoading,
}) => {
  const [currentPostList, setPostList] = useState<Post[]>([]);

  const allPosts = async () => {
    const result = await getAllPosts();

    setPostList(result);
    setIsLoading(false);
  };

  const findposts = async () => {
    const result = await getPosts(userSelectedId);

    setPostList(result);
    setIsLoading(false);
  };

  useEffect(() => {
    findposts();
  }, [userSelectedId]);

  useEffect(() => {
    allPosts();
  }, []);

  return (
    <div className="PostsList">
      <>
        <h2>Posts:</h2>
        <ul
          className="PostsList__list"
          data-cy="postDetails"
        >
          {currentPostList.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>
                  [User
                  {' '}
                  {post.userId}
                  ]:
                  {' '}
                </b>
                {post.body}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if ((post) && (postId === post.id)) {
                    selectPostId(undefined);
                  } else {
                    selectPostId(post.id);
                  }

                  setIsLoading(true);
                }}
              >
                {post && (postId === post.id)
                  ? 'Close'
                  : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};
