import React, { useEffect, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentInfo } from './CommentInfo';
import { Loader } from './Loader';

import { addComment, deleteComments, getComments } from './api/fetchComments';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost as Post;
  const [writing, setWriting] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [errorComments, setErrorComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingNewComm, setLoadingNewComm] = useState(false);

  const loadComments = async (postId: number) => {
    setLoadingComments(true);
    setErrorComments(false);
    try {
      const comm = await getComments(postId);

      setComments(comm);
    } catch {
      setErrorComments(true);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      loadComments(selectedPost?.id);
      setWriting(false);
    }
  }, [selectedPost]);

  const createComment = async (data: Omit<Comment, 'id'>) => {
    setLoadingNewComm(true);
    try {
      const newComment = await addComment({ ...data });

      setComments(prevComm => {
        return [...prevComm, newComment];
      });
    } catch (e) {
      setErrorComments(true);
      throw e;
    } finally {
      setLoadingNewComm(false);
    }
  };

  const deleteComm = async (commId: number) => {
    await deleteComments(commId);

    setComments(prevComm => {
      return prevComm.filter(comm => comm.id !== commId);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {!loadingComments && errorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loadingComments && !errorComments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loadingComments && !errorComments && comments.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <CommentInfo
                  key={comment.id}
                  comment={comment}
                  deleteComm={deleteComm}
                />
              ))}
            </>
          )}

          {!loadingComments && !errorComments && !writing && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriting(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!loadingComments && writing && (
          <NewCommentForm
            loadingNewComm={loadingNewComm}
            createComment={createComment}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
