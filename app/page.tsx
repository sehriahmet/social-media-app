"use client";

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/slices/postsSlice';
import { RootState, AppDispatch } from '../store';

import PostCard from "@/components/shared/PostCard"
import SearchBar from "@/components/shared/SearchBar"

const Home = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, isLoading, hasNextPage } = useSelector((state: RootState) => state.posts);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      if (searchInput) {
        const results = posts.filter(post => 
          post.content?.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPosts(results);
      } else {
        setFilteredPosts([]);
      }
      setIsSearching(false);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput, posts]);

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading && hasNextPage) {
        dispatch(fetchPosts(page));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, page, isLoading, hasNextPage]);

  // useEffect(() => {
  //   console.log('Posts after search or fetch:',searchInput, posts, filteredPosts);
  // }, [posts]);

  // console.log(window.innerHeight + window.scrollY , document.body.offsetHeight);

  // console.log(posts, page, searchInput);
  
  return (
    <div>
      {/* Header section */}
      <section className='flex flex-row items-center justify-between w-full h-12 backdrop-blur sticky top-0 z-20'>
        <h1 className="font-bold text-xl ml-4 cursor-pointer"><a href="#">Home</a></h1>
        <div className="mr-4 cursor-pointer">
          <img src="/assets/cardTitleIcon/sparks.svg" alt="Sparks" />
        </div>
      </section>

      {/* Searchbar section */}
      <section className="flex justify-center items-center p-4 border-t">
        <SearchBar value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </section>

      {/* New post section */}
      <section className="border-r-[0.5px] border-b-[0.5px] flex items-stretch py-4 space-x-2 h-32 relative">
        <div className="ml-4 w-12 h-12 bg-slate-400 rounded-full flex-none mt-2"></div>
        <div className="flex flex-col w-full h-full">
          <input
            type="text"
            className="w-full- h-full bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
            placeholder="What's Happening?"
          />
          <div className="w-full justify-between items-center flex">
            <div className="flex flex-row px-4 space-x-4">
              <button className="rounded-md hover:bg-orange-500/5" ><img src="/assets/postIcon/addPicture.svg" alt="Picture" /></button>
              <button className="rounded-md hover:bg-orange-500/5" ><img src="/assets/postIcon/Vector.svg" alt="Vector" /></button>
              <button className="rounded-md hover:bg-orange-500/5" ><img src="/assets/postIcon/stats.svg" alt="Stats" /></button>
              <button className="rounded-md hover:bg-orange-500/5" ><img src="/assets/postIcon/smiley.svg" alt="Smiley" /></button>
              <button className="rounded-md hover:bg-orange-500/5" ><img src="/assets/postIcon/history.svg" alt="History" /></button>

            </div>
            <div className="w-full max-w-[100px]">
              <button className="rounded-full bg-orange-500 text-white py-2 px-4 font-bold text-sm text-center hover:bg-opacity-80 transition duration-200">
                Post
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* All posts section */}
      <section className="flex flex-col w-full">
        {searchInput && isSearching && filteredPosts.length < 1 ? (
          <p>Searching...</p>
          ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              )
            )
        )}

        {searchInput && !isSearching && filteredPosts.length < 1 && (
          <p>Not found</p>
        )}

        {!searchInput && posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {isLoading && <p>Loading...</p>}
      </section>

    </div>
  )
}

export default Home
