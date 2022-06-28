import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/post';
import { Comment, NewComment, Post } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[] | NewComment[]>([]);
  const [isShowComments, setIsShowComments] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  const handleComment = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  useEffect(() => {
    getPostComments(postId)
      .then(commentsFromServer => setComments(commentsFromServer));

    getPostDetails(postId.toString())
      .then(postFromServer => setPost(postFromServer));
  }, [postId]);

  const handlerDelete = (commentId: number) => {
    deleteComment(commentId);

    getPostComments(postId)
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setIsShowComments(!isShowComments)}
        >
          {!isShowComments
            ? `Hide ${comments.length} comments`
            : `Shown ${comments.length} comments`}
        </button>

        {!isShowComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handlerDelete(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          {post && (
            <NewCommentForm postId={post?.id} handleComment={handleComment} />
          )}
        </div>
      </section>
    </div>
  );
};
