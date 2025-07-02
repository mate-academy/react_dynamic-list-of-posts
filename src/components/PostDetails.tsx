import React from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';

type PostDetailsProps = {
  selectedPost: Post | null;
  selectedComments: Comment[] | null;
  setSelectedComments: (list: Comment[] | null) => void;
  setNewCommentPressed: (val: boolean) => void;
  newCommentPressed: boolean;
  setAddCommentError: (val: boolean) => void;
  setDeleteError: (val: boolean) => void;
  postInfoLoading: boolean;
  commentsError: boolean;
  addCommentError: boolean;
  visibleComList: Comment[] | null;
  setVisibleComList: (val: Comment[] | null) => void;
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  selectedPost,
  selectedComments,
  setNewCommentPressed,
  newCommentPressed,
  setSelectedComments,
  setDeleteError,
  postInfoLoading,
  commentsError,
  setAddCommentError,
  addCommentError,
  visibleComList,
  setVisibleComList,
}) => {
  const deleteComment = async (id: number) => {
    try {
      if (visibleComList) {
        setVisibleComList(visibleComList?.filter(comment => comment.id !== id));
      }

      await client.delete(`/comments/${id}`);

      if (selectedComments) {
        setSelectedComments(
          selectedComments.filter(comment => comment.id !== id),
        );
      }
    } catch {
      setDeleteError(true);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {postInfoLoading && <Loader />}

          {(commentsError || addCommentError) && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {selectedComments !== null && selectedComments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {selectedComments && !commentsError && !addCommentError && (
            <>
              <p className="title is-4">Comments:</p>

              {visibleComList?.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {!newCommentPressed && !addCommentError && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => {
                    setNewCommentPressed(true);
                  }}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {newCommentPressed && !addCommentError && (
          <NewCommentForm
            selectedComments={selectedComments}
            setSelectedComments={setSelectedComments}
            selectedPost={selectedPost}
            setAddCommentError={setAddCommentError}
            setVisibleComList={setVisibleComList}
          />
        )}
      </div>
    </div>
  );
};
