// app/profile/page.tsx
"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByUsername, resetPosts } from '../../store/slices/postsSlice';
import { RootState, AppDispatch } from '../../store';
import PostCard from "@/components/shared/PostCard";
import Image from 'next/image';
import Loader from '@/components/shared/Loader';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, isLoading, hasNextPage } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(fetchPostsByUsername({ page: 1, username: 'travelbug' }));
    
    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading && hasNextPage) {
        dispatch(fetchPostsByUsername({ page, username: 'travelbug' }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, page, isLoading, hasNextPage]);

  // console.log(posts, page);

  return (
    <div>
      {/* Header Section */}
      <section className='flex flex-row items-center justify-between w-full h-12 backdrop-blur sticky top-0 z-30'>
        <h1 className="hidden lg:flex font-bold text-xl ml-4 cursor-pointer"><a href="#">Profile</a></h1>
        <div className="flex flex-row justify-end w-full mr-4 cursor-pointer">
          <img src="/assets/cardTitleIcon/sparks.svg" alt="Sparks" />
        </div>
      </section>

      {/* Profile Information Section */}
      <section className="flex h-96 w-full flex-col justify-between">
        <div className="absolute h-64 bg-[#F6441E] rounded-sm w-full lg:max-w-3xl" />
        <div className="flex flex-col w-full justify-start mt-48 px-8 ml:px-12 space-y-2">
          {/* Profile image */}
          <div className="flex w-24 h-24 md:w-32 md:h-32 bg-slate-400 rounded-full z-20"><Image width={128} height={128} src="/assets/avatarImages/avatar-6.jpg" alt="More" className="h-full w-full object-cover rounded-full"/></div>
          {/* Name, Username */}
          <div className="flex flex-col p-2">
            <div className="font-bold text-lg">travelbug</div>
            <div className="text-gray-500 text-sm">@travelbug</div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="flex flex-col w-full mt-24">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {isLoading && <div className='w-full h-full flex items-center justify-center p-10'><Loader /></div>}
      </section>
    </div>
  );
}
