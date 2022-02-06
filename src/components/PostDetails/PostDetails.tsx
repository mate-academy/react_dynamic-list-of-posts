import React, { useEffect, useState } from 'react';
import './PostDetails.scss';
// Components
import { CommentsList } from '../CommentsList';
import { NewCommentForm } from '../NewCommentForm';
// Api requests
import { getPostsDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
// Types
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { LoadComments } from '../../types/LoadComments';

type Props = {
  selectedPostId: number;
};

export const PostDetails = React.memo<Props>(
  ({ selectedPostId }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    const loadComments: LoadComments = (postId) => {
      getPostComments(postId)
        .then(receivedCommnets => setComments(receivedCommnets));
    };

    useEffect(() => {
      getPostsDetails(selectedPostId)
        .then(receivedPost => setPost(receivedPost));

      loadComments(selectedPostId);
    }, [selectedPostId]);

    return (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{post?.body}</p>
        </section>

        <section className="PostDetails__comments">
          <CommentsList comments={comments} loadComments={loadComments} />
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm postId={selectedPostId} loadComments={loadComments} />
          </div>
        </section>
      </div>
    );
  },
);
