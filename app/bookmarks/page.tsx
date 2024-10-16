"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/store/slices/postsSlice';
import { resetPosts } from '@/store/slices/postsSlice';
import { AppDispatch, RootState } from '@/store';

import PostCard from "@/components/shared/PostCard"
import Loader from '@/components/shared/Loader';

const Bookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, isLoading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(fetchPosts({ page: 10 }));
    
    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch]);

  return (
    <div>
      {/* Header section */}
      <section className='flex flex-row items-center justify-between w-full h-12 backdrop-blur sticky top-0 z-20'>
        <h1 className="hidden lg:flex font-bold text-xl ml-4 cursor-pointer"><a href="#">Bookmarks</a></h1>
        <div className="flex flex-row justify-end w-full mr-4 cursor-pointer">
        <img src="/assets/cardTitleIcon/sparks.svg" alt="Sparks" />
        </div>
      </section>

      {/* TO-DO */}
      {/* Posts Section */}
      <section className="flex flex-col w-full mt-24">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {isLoading && <div className='w-full h-full flex items-center justify-center p-10'><Loader /></div>}
      </section>

    </div>
  )
}

export default Bookmarks