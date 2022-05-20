/* eslint-disable max-len */
import React, { useEffect } from 'react';
import './PostsList.scss';
import { getUserPostsByID, getUsersPosts } from '../../api/posts';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { Loader } from '../Loader';

type Props = {
  user: User | null;
  selectValue: string;
  selectedPostId: number;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>;
  setPostLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setSelectedPostComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  isPostListLoading: boolean;
  setPostListLoading: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
};

export const PostsList: React.FC<Props> = ({
  user,
  selectValue,
  selectedPostId,
  setSelectedPostId,
  setPostLoading,
  setSelectedPost,
  setSelectedPostComments,
  isPostListLoading,
  setPostListLoading,
  posts,
  setPosts,
}) => {
  const getPostsFromServer = async () => {
    try {
      const allPosts = await getUsersPosts();

      setPostListLoading(false);
      setPosts(allPosts);
    } catch (error) {
      setPosts(null);
    }
  };

  const getPostsFromServerByID = async () => {
    try {
      if (user !== null) {
        const userPosts = await getUserPostsByID(user.id);

        setPosts(userPosts);
        setPostListLoading(false);
      }
    } catch (error) {
      setPosts(null);
      setPostListLoading(false);
    }
  };

  useEffect(() => {
    setPostListLoading(true);
    if (selectValue === 'All users') {
      getPostsFromServer();

      return;
    }

    getPostsFromServerByID();
  }, [user]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {posts && (
          posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
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
                  if (selectedPostId === post.id) {
                    setPostLoading(false);
                    setSelectedPostId(0);
                    setSelectedPost(null);
                    setSelectedPostComments(null);

                    return;
                  }

                  setSelectedPost(null);
                  setSelectedPostComments(null);
                  setPostLoading(true);
                  setSelectedPostId(post.id);
                }}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          )))}

        {isPostListLoading && (
          <Loader />
        )}
      </ul>

    </div>
  );
};
