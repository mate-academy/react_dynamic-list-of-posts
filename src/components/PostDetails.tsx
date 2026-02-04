import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as client from '../api/fetchComments';
import { CommentsList } from './CommentsList';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [loadingComments, setLoadingComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [formIsShow, setFormIsShow] = useState(false);
  const [error, setError] = useState('');

  const { id, title, body } = post;

  async function deleteComment(commId: number) {
    setError('');
    setPostComments(cur =>
      cur ? cur.filter(comm => commId !== comm.id) : null,
    );
    try {
      await client.deletePostComment(commId);
    } catch {
      setError('Failed to remove the commentary, try later');
      setPostComments(postComments);
    }
  }

  async function addNewComment(comm: Omit<Comment, 'id' | 'postId'>) {
    setError('');
    try {
      const promise = await client.addNewComment({ ...comm, postId: id });

      setPostComments(cur => (cur ? [...cur, promise] : null));
    } catch (er) {
      setError('Failed to add a commentary, try later');
      setFormIsShow(false);
    }
  }

  useEffect(() => {
    async function getComments() {
      setLoadingComments(true);
      setFormIsShow(false);

      try {
        setError('');
        const comments = await client.getPostComments(id);

        setPostComments(comments);
      } catch {
        setError('Failed to load comments');
      } finally {
        setLoadingComments(false);
      }
    }

    getComments();
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {error && !loadingComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!loadingComments && postComments && !error && (
            <>
              {postComments.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {postComments.length > 0 && (
                <CommentsList
                  comments={postComments}
                  onDeleteComment={commentId => deleteComment(commentId)}
                />
              )}
            </>
          )}

          {!loadingComments && !error && !formIsShow && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormIsShow(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formIsShow && (
          <NewCommentForm key={id} addNewComment={addNewComment} />
        )}
      </div>
    </div>
  );
};
