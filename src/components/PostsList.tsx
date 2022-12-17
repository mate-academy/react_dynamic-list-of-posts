import React, { useCallback, useEffect } from 'react';
import { getPosts } from '../api/posts';
import { Post } from '../types/Post';

type Props = {
  selectedUserId: string,
  selectedUserPostId: number,
  setSelectedUserPostId: (postId: number) => void,
  openUserPost: boolean,
  setOpenUserPost: (
    isOpen: boolean) => void,
  selectedUserPosts: Post[],
  setSelectedUserPosts: (userPosts: Post[]) => void,
  setSelectedUserPost: (userPost: Post) => void,
  setIsLoadingComments: (load: boolean) => void,
  setWriteComment: (load: boolean) => void,
  isLoadingUserPosts: boolean,
  setIsLoadingUserPosts: (load: boolean) => void,
  failedToFetch: boolean,
  setFailedToFetch: (loadData: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  openUserPost,
  setOpenUserPost,
  selectedUserPosts,
  setSelectedUserPost,
  selectedUserPostId,
  setSelectedUserPostId,
  setIsLoadingComments,
  setWriteComment,
  setSelectedUserPosts,
  isLoadingUserPosts,
  setIsLoadingUserPosts,
  failedToFetch,
  setFailedToFetch,
}) => {
  const loadUserPostsFromServer = useCallback(
    async () => {
      try {
        setFailedToFetch(false);
        const postsFromServer = await getPosts(selectedUserId);

        setSelectedUserPosts(postsFromServer);
      } catch (error) {
        setFailedToFetch(true);
      } finally {
        setIsLoadingUserPosts(false);
      }
    }, [selectedUserId],
  );

  useEffect(() => {
    loadUserPostsFromServer();
  }, [selectedUserId]);

  const handleLoaderComments = (post: Post) => {
    if (openUserPost && selectedUserPostId !== post.id) {
      setOpenUserPost(true);
    } else {
      setOpenUserPost(!openUserPost);
    }

    setWriteComment(false);
    setSelectedUserPostId(post.id);
    setSelectedUserPost(post);
    setIsLoadingComments(true);
  };

  return (
    <>
      {
        selectedUserPosts.length > 0
        && !isLoadingUserPosts && !failedToFetch && (
          <div data-cy="PostsList">
            <p className="title">Posts:</p>
            <table
              className="table is-fullwidth is-striped is-hoverable is-narrow"
            >
              <thead>
                <tr className="has-background-link-light">
                  <th>#</th>
                  <th>Title</th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                {selectedUserPosts.map(post => (
                  <tr
                    data-cy="Post"
                    key={post.id}
                  >
                    <td data-cy="PostId">{post.id}</td>

                    <td data-cy="PostTitle">
                      {post.title}
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        type="button"
                        data-cy="PostButton"
                        className={`button is-link ${openUserPost && selectedUserPostId === post.id ? '' : 'is-light'} `}
                        onClick={() => handleLoaderComments(post)}
                      >
                        {(openUserPost && selectedUserPostId === post.id)
                          ? 'Close'
                          : 'Open'}
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )
      }
    </>
  );
};
