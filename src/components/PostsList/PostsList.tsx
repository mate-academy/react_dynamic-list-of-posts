import React, { useState, useEffect } from 'react';
import './PostsList.scss';

import { Post } from '../../types/Post';

import { getAllPosts, getUserPosts } from '../../api/posts';

import { Loader } from '../Loader';

type Props = {
  selectedUserId: number,
  selectedPostId: number | null,
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>,
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPostId,
  setSelectedPostId,
}) => {
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const onSelectingPost = (post: Post) => {
    setSelectedPostId(post.id);
  };

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoadingPost(true);

      const result = selectedUserId === 0
        ? await getAllPosts()
        : await getUserPosts(selectedUserId);

      setUserPosts(result);
      setIsLoadingPost(false);
    };

    loadPosts();
  }, [selectedUserId]);

  return (userPosts && !isLoadingPost
    ? (
      <div className="PostsList">
        <h2>Posts:</h2>

        {userPosts.length
          ? (
            <ul className="PostsList__list" data-cy="postDetails">
              {userPosts.map(post => (
                <li className="PostsList__item" key={post.id}>
                  <div>
                    <b>{`[User #${post.userId}]: `}</b>
                    {post.title}
                  </div>

                  {(selectedPostId !== post.id)
                    ? (
                      <button
                        type="button"
                        className="PostsList__button button"
                        onClick={() => {
                          onSelectingPost(post);
                        }}
                      >
                        Open
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="PostsList__button button"
                        onClick={() => {
                          setSelectedPostId(null);
                        }}
                      >
                        Close
                      </button>
                    )}
                </li>
              ))}
            </ul>
          )
          : (
            <div>
              The selected user has no posts yet
            </div>
          )}
      </div>
    )
    : (
      <Loader />
    )
  );
};
