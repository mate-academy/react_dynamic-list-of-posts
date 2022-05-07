export const BASE_URL1 = 'https://mate.academy/students-api/posts';
export const BASE_URL2 = 'https://mate.academy/students-api/comments';

export const request = () => {
  return fetch(BASE_URL1)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getUserPosts = (userId: string) => {
  return fetch(`${BASE_URL1}/${userId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getPostDetails = (postId: string) => {
  return fetch(`${BASE_URL1}?userId=${postId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getPostComments = (postId: string) => {
  return fetch(`${BASE_URL2}${postId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const createComment
  = (postId: number, name: string, email: string, body: string) => {
    return fetch(BASE_URL2, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} - ${res.statusText}`);
        }

        return res.json();
      });
  };

export const removeComment = (commentId: string) => {
  return fetch(`${BASE_URL2}/${commentId}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};
