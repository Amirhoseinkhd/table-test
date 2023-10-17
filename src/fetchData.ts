export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Post[] = await res.json();
  return data;
};
