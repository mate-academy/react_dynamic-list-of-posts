export async function getUserPosts(userId = 0): Promise<Post[]> {
  let postsURL = 'https://mate.academy/students-api/posts';

  if (userId !== 0) {
    postsURL += `?userId=${userId}`;
  }

  return fetch(postsURL)
    .then(response => response.json());
}

export async function getPostDetails(postId: number): Promise<Post> {
  return fetch(`https://mate.academy/students-api/posts/${postId}`)
    .then(response => response.json());
}

export async function getPostComments(postId: number): Promise<Comment[]> {
  return fetch(`https://mate.academy/students-api/comments?postId=${postId}`)
    .then(response => response.json());
}

export async function getUsers(): Promise<User[]> {
  return fetch('https://mate.academy/students-api/users')
    .then(response => response.json());
}
