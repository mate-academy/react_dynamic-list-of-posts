import React, { useContext, useEffect } from 'react';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { DispatchContext, ReducerActions, StateContext } from '../AppContext';

export const PostDetails: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  const {
    selectedPost: post,
    postComments,
    isPostsCommentsLoading,
    isPostsCommentsError,
    isWriteComment,
  } = useContext(StateContext);

  const getPostDetailsFromApi = async () => {
    if (post) {
      dispatch({
        type: ReducerActions.setIsPostsCommentsLoading,
        payload: true,
      });

      await client.get<Comment[]>(`/comments?postId=${post.id}`)
        .then(res => {
          dispatch({
            type: ReducerActions.setPostComments,
            payload: res,
          });
        })
        .catch(() => dispatch({
          type: ReducerActions.setIsPostsCommentsError,
          payload: true,
        }))
        .finally(() => dispatch({
          type: ReducerActions.setIsPostsCommentsLoading,
          payload: false,
        }));
    }
  };

  useEffect(() => {
    getPostDetailsFromApi();
  }, [post]);

  const handelDeletePost = (id: number) => {
    client.delete(`/comments/${id}`);

    dispatch({
      type: ReducerActions.setPostComments,
      payload: postComments?.filter(postComment => postComment.id !== id),
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isPostsCommentsLoading && <Loader />}

          {!isPostsCommentsLoading && isPostsCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isPostsCommentsLoading && !isPostsCommentsError
          && postComments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isPostsCommentsLoading && postComments?.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {postComments?.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handelDeletePost(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isPostsCommentsLoading && !isPostsCommentsError
          && !isWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => dispatch({
                type: ReducerActions.setIsWriteComment,
                payload: true,
              })}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteComment
          && (
            <NewCommentForm />
          )}
      </div>
    </div>
  );
};
