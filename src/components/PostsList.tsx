import React from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null,
  setPost: (value: Post) => void,
  userPosts: Post[],
  detailsSeen: boolean,
  setDetailsSeen: (value: boolean) => void,
  setPostComments: (value: Comment[]) => void,
  setIsLoadingComments: (value: boolean) => void,
  setIsError: (value: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  post, setPost, userPosts, detailsSeen, setDetailsSeen,
  setIsLoadingComments, setPostComments, setIsError,
}) => {
  const textInButton = (singlePost: Post) => {
    if (!post) {
      return 'Open';
    }

    return detailsSeen && post.id === singlePost.id ? 'Close' : 'Open';
  };

  const getPost = async (singlePost: Post) => {
    setIsLoadingComments(true);
    try {
      const usersResponse = client.get('/comments');
      const usersResult = await usersResponse;

      if (Array.isArray(usersResult) && usersResult) {
        await setPostComments(usersResult.filter(
          (comment: Comment) => comment.postId === singlePost.id,
        ));
      }
    } catch (error) {
      setIsError(true);
      throw Error('An error occured');
    }

    setIsLoadingComments(false);

    setPost(singlePost);
    setDetailsSeen(true);

    if (post && detailsSeen && post.id === singlePost.id) {
      setDetailsSeen(false);
    }
  };

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
          {
            userPosts.map((singlePost: Post) => {
              return (
                <tr data-cy="Post" key={singlePost.id}>
                  <td data-cy="PostId">{singlePost.id}</td>
                  <td data-cy="PostTitle">
                    {singlePost.title}
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={`button is-link 
                      ${textInButton(singlePost) === 'Open' && 'is-light'}`}
                      onClick={() => {
                        getPost(singlePost);
                      }}
                    >
                      {textInButton(singlePost)}
                    </button>
                  </td>
                </tr>
              );
            })

          }
        </tbody>
      </table>
    </div>
  );
};
