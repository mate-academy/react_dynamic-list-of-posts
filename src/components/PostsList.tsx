// import classNames from 'classnames';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { getPosts } from '../api/posts';
import { Post } from '../types/Post';

type Props = {
  selectedUser: string,
  openUserPost: boolean,
  setOpenUserPost: (
    isOpen: boolean) => void,
  // selectedUserPosts: Post[],
  setSelectedUserPost: (userPost: Post) => void,
  selectedUserPostId: number,
  setSelectedUserPostId: (postId: number) => void,
  setIsLoadingComments: (load: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  openUserPost,
  setOpenUserPost,
  // selectedUserPosts,
  setSelectedUserPost,
  selectedUserPostId,
  setSelectedUserPostId,
  setIsLoadingComments,
}) => {
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[] | []>([]);
  // const [selectedUserPostId, setSelectedUserPostId] = useState(0);

  const loadUserPostsFromServer = useCallback(
    async () => {
      try {
        const postsFromServer = await getPosts();
        const filteredPosts = postsFromServer.filter(
          post => post.userId === +selectedUser,
        );

        setSelectedUserPosts(filteredPosts);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    }, [selectedUser],
  );

  useEffect(() => {
    loadUserPostsFromServer();
  }, [selectedUser]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
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
                  onClick={() => {
                    if (openUserPost && selectedUserPostId !== post.id) {
                      setOpenUserPost(true);
                      setSelectedUserPostId(post.id);
                      setSelectedUserPost(post);
                      setIsLoadingComments(true);
                    } else {
                      setOpenUserPost(!openUserPost);
                      setSelectedUserPostId(post.id);
                      setSelectedUserPost(post);
                      setIsLoadingComments(true);
                    }
                  }}
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
  );
};
