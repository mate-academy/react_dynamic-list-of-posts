import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getPosts } from '../../api/api';
import { Post } from '../../react-app-env';

type Props = {
  userSelectedId: string;
  selectPost: (arg?: Post) => void;
  post: Post | undefined;
  setIsLoading: (arg: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  userSelectedId,
  selectPost,
  post,
  setIsLoading,
}) => {
  const [currentPostList, setPostList] = useState<Post[]>([]);

  const findposts = async () => {
    const result = await getPosts(userSelectedId);

    setPostList(result);
    setIsLoading(false);
  };

  useEffect(() => {
    findposts();
  }, [userSelectedId]);

  return (
    <div className="PostsList">
      <>
        <h2>Posts:</h2>
        <ul
          className="PostsList__list"
          data-cy="postDetails"
        >
          {currentPostList.map(po => (
            <li
              className="PostsList__item"
              key={po.id}
            >
              <div>
                <b>
                  [User
                  {' '}
                  {po.userId}
                  ]:
                  {' '}
                </b>
                {po.body}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if ((post) && (post.id === po.id)) {
                    selectPost(undefined);
                  } else {
                    selectPost(po);
                  }

                  setIsLoading(true);
                }}
              >
                {post && (post.id === po.id)
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
