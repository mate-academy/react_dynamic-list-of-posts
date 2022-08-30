/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { deleteMethod } from '../../api/api';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

const emptyPost = {
  id: 0,
  title: '',
  body: '',
  createdAt: 'December 17, 1995 03:24:00',
  updatedAt: 'December 17, 1995 03:24:00',
  userId: 0,
};

export const PostDetails: React.FC<Props> = React.memo(({ postId }) => {
  const [post, setPost] = useState<Post>(emptyPost);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsHidden, setIsCommentsHidden] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      setPost(await getPostDetails(postId));
      setComments(await getPostComments(postId));
    }());
  }, [postId, comments]);

  const deleteComment = (commentId:number) => {
    return deleteMethod(`/comments/${commentId}`);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsCommentsHidden(!isCommentsHidden);
          }}
        >
          {comments.length === 0
            ? 'No comments yet'
            : (isCommentsHidden
              ? `Show ${comments.length} comments`
              : `Hide ${comments.length} comments`)}
        </button>

        {!isCommentsHidden
          && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
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
          <NewCommentForm postId={post.id} />
        </div>
      </section>
    </div>
  );
});
