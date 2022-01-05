import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import { Post } from '../../Types/Post';
import { Comment } from '../../Types/Comment';
import './PostDetails.scss';

type Props = {
  postId: Post['id'];
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postComments, setComments] = useState<Comment[]>([]);
  const [postDetails, setPostDetails] = useState<Post>();
  const [commentsVisible, setCommentsVisibility] = useState(true);
  const [commentId, setCommentId] = useState<number>(0);

  const getNewCommentId = () => {
    const idArray = postComments.map(comment => comment.id);

    setCommentId(Math.max(...idArray) + 1);
  };

  useEffect(() => {
    const fetchPostDetils = async () => {
      try {
        const details: Post = await getPostDetails(postId);

        setPostDetails(details);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error has occurred when fetching posts');
      }
    };

    const fetchPostComments = async () => {
      try {
        const comments: Comment[] = await getPostComments(postId);

        setComments(comments);
        getNewCommentId();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error has occurred when fetching post comments');
      }
    };

    Promise.all([fetchPostDetils(), fetchPostComments()]);
  }, [postId]);

  const addComment = (newComment: Comment) => {
    setComments([...postComments, newComment]);
    getNewCommentId();
  };

  const deleteComment = (commentIdToDelete: Comment['id']) => {
    if (!postComments) {
      return;
    }

    setComments(
      postComments.filter(comment => comment.id !== commentIdToDelete),
    );
    getNewCommentId();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setCommentsVisibility(!commentsVisible)}
          >
            {`${commentsVisible ? 'Hide' : 'Show'} ${
              postComments.length
            } comments`}
          </button>
        )}

        {commentsVisible && (
          <ul className="PostDetails__list">
            {postComments?.map(({ id, body }) => (
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(id)}
                >
                  X
                </button>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} postId={postId} commentId={commentId} />
        </div>
      </section>
    </div>
  );
};
