import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment, Post } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [visibleComments, setVisibleComments] = useState(true);
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);

  const postHandler = async () => {
    const postDetails = await getPostDetails(postId);

    setPost(postDetails);

    const commentItems = await getPostComments(postId);

    setComments(commentItems);
  };

  useEffect(() => {
    postHandler();
  }, [postId]);

  const deleteHandler = async (commentId: number) => {
    if (postId) {
      await deleteComment(commentId);
      const newComments = await getPostComments(postId);

      setComments(newComments);
    }
  };

  const commentsHandler = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setVisibleComments(!visibleComments);
          }}
        >
          {visibleComments ? 'Hide comments' : 'Show comments'}
        </button>
        {visibleComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteHandler(comment.id)}
                >
                  X
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          {post && (
            <NewCommentForm
              post={post}
              comments={comments}
              onCommentsHandler={commentsHandler}
            />
          )}
        </div>
      </section>
    </div>
  );
};
