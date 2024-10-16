
export const fetchPosts = async (page: number) => {
  const response = await fetch(`https://asehriyaroglu-doggo-web-task.vercel.app/api/posts?_sort=timestamp&_order=desc&_page=${page}&_per_page=5`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};
