import React, { useEffect, useState } from 'react';
import { deletePostComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment, Post } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC<{ postId:number }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();
  const [commentsHidden, setCommentsHidden] = useState(false);

  const updateComments = () => {
    getPostComments(postId).then(comments1 => setComments(comments1));
  };

  useEffect(() => {
    getPostDetails(postId).then(post1 => setPost(post1));
    updateComments();
  }, [postId]);

  const deleteComment = (event:React.MouseEvent<HTMLButtonElement>) => {
    const commentId = event.currentTarget.id;

    deletePostComment(+commentId).then(() => updateComments());
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? <button type="button" className="button" onClick={() => setCommentsHidden(!commentsHidden)}>{`${commentsHidden ? 'Show' : 'Hide'} ${comments.length} comments`}</button> : ''}

        {comments.length && !commentsHidden
          ? (
            <ul className="PostDetails__list">
              {comments.map((comment) => (
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    id={`${comment.id}`}
                    className="PostDetails__remove-button button"
                    onClick={deleteComment}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )
          : ''}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm updateComments={updateComments} postId={postId} />
        </div>
      </section>
    </div>
  );
};
