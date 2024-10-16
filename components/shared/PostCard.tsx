"use client"

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
    username: string;
    content: string;
    timestamp: string;
}

interface Post {
    id: string;
    username: string;
    content: string;
    timestamp: string;
    images?: string[];
    comments?: Comment[];
    reposts?: number;
    likes?: number;
    tags?: string[];
  }

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const [showAllComments, setShowAllComments] = useState(false);

    const toggleComments = () => {
        setShowAllComments((prevState) => !prevState);
    }
    
    const comments = post?.comments || [];
    const commentsToShow = showAllComments ? comments : comments.length > 0 ? [comments[comments.length - 1]] : [];

    // console.log(post.id)

    function convertUnsplashUrl(originalUrl: string): string {
        const dimensions = originalUrl.match(/(\d+)x(\d+)/);
        
        if (!dimensions) {
            throw new Error('Invalid URL format: dimensions not found');
        }
    
        const width: string = dimensions[1];
        const height: string = dimensions[2];
    
        const queryTerm: string | undefined = originalUrl.split('?')[1];
    
        if (!queryTerm) {
            throw new Error('Invalid URL format: query term not found');
        }
    
        return `https://unsplash.it/${width}/${height}?${queryTerm}`;
    }

    function getAvatarImage(username: string): string {
        const avatarMap: { [key: string]: string } = {
            bookworm: '/assets/avatarImages/avatar-1.jpg',
            fitnessjunkie: '/assets/avatarImages/avatar-2.jpg',
            foodlover: '/assets/avatarImages/avatar-3.jpg',
            cheflover: '/assets/avatarImages/avatar-4.jpg',
            techguru: '/assets/avatarImages/avatar-5.jpg',
            travelbug: '/assets/avatarImages/avatar-6.jpg',
        };
    
        return avatarMap[username] || '/assets/avatarImages/avatar.jpg';
    }

    return (
        <div key={post.id} id = {post.id} className="border-r-[0.5px] p-4 border-b-[0.5px] flex flex-col">

            {/* Main Post Section */}
            <div className="flex space-x-4 lg:w-full">

                {/* Main Avatar Image */}
                <div className="w-12 h-12 bg-slate-400 rounded-full flex-none"><img src={getAvatarImage(post.username)} alt="Avatar" className="h-full w-full object-cover rounded-full" /></div>
                
                {/* Post Details */}
                <div className="flex flex-col space-y-2 w-full">
                    <div className="flex items-center justify-between">
                        <span className="flex space-x-2">
                            <div className="font-bold">{post.username}</div>
                            <div className="text-gray-500">@{post.username}</div>
                            <div className="text-gray-500">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</div>
                        </span>
                        <div><button className="rounded-sm hover:bg-black/5" ><img src="/assets/postedContentIcons/options.svg" alt="More" /></button></div>
                    </div>
                    <div>{post.content}</div>
                    {post.images && post.images?.length > 0 && (
                        <div className="bg-slate-400 lg:aspect-square h-96 rounded-xl">
                            <img src={convertUnsplashUrl(post.images[0])} alt="post" className="h-full w-full object-cover rounded-xl" />
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between w-3/4">
                        <div className='flex flex-row group'>
                            <img src="/assets/postedContentIcons/comment.svg" alt="Comment" className='cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2' />
                            <p className='text-gray-500 py-1 group-hover:text-orange-500 cursor-pointer'>{post.comments && post?.comments?.length > 0 ? post?.comments?.length : ''}</p>
                        </div>
                        <div className='flex flex-row group'>
                            <img src="/assets/postedContentIcons/options-1.svg" alt="Repost" className='cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2' />
                            <p className='text-gray-500 group-hover:text-orange-500 py-1 cursor-pointer '>{post.reposts && post?.reposts > 0 ? post?.reposts : ''}</p>
                        </div>
                        <div className='flex flex-row group'>
                            <img src="/assets/postedContentIcons/heart.svg" alt="Like" className='cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2' />
                            <p className='text-gray-500 py-1 group-hover:text-orange-500 cursor-pointer'>{post.likes && post.likes > 0 ? post.likes : ''}</p>
                        </div>
                        <div className='flex flex-row group'>
                            <img src="/assets/postedContentIcons/save.svg" alt="Share" className="cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2" />
                        </div>
                    </div>

                </div>
            
            </div>

            {/* Load More Comments */}
            {post.comments && post.comments?.length > 1 && (
                <div className='flex ml-6 mb-2 border-dashed border-l'>
                    <button 
                        onClick={toggleComments}
                        className="text-blue-500 hover:underline ml-10 py-6 flex "
                    >
                        {showAllComments ? 'Show less Replies' : `Show More Replies (${post.comments && post.comments.length})`}
                    </button>
                </div>
            )}

            {/* Comments Section */}
            {commentsToShow.map((comment, index) => (
                
                <div key={index} className="w-full h-auto bg-transparent flex space-x-4 py-2">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-slate-400 rounded-full flex-none">
                        <img
                            src={getAvatarImage(comment.username)}
                            alt="Avatar"
                            className="h-full w-full object-cover rounded-full"
                        />
                    </div>

                    {/* Comment Content */}
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="flex items-center justify-start">
                            <span className="flex space-x-2">
                                <div className="font-bold">{comment.username}</div>
                                <div className="text-gray-500">@{comment.username}</div>
                                <div className="text-gray-500">
                                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                                </div>
                            </span>
                        </div>
                        <div>{comment.content}</div>

                        {/* Action Icons */}
                        <div className="flex items-center justify-between w-3/4">
                            <div className="flex flex-row group">
                                <img
                                    src="/assets/postedContentIcons/comment.svg"
                                    alt="Comment"
                                    className="cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2"
                                />
                                <p className="text-gray-500 py-1 group-hover:text-orange-500 cursor-pointer"></p>
                            </div>
                            <div className="flex flex-row group">
                                <img
                                    src="/assets/postedContentIcons/options-1.svg"
                                    alt="Repost"
                                    className="cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2"
                                />
                                <p className="text-gray-500 group-hover:text-orange-500 py-1 cursor-pointer "></p>
                            </div>
                            <div className="flex flex-row group">
                                <img
                                    src="/assets/postedContentIcons/heart.svg"
                                    alt="Like"
                                    className="cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2"
                                />
                                <p className="text-gray-500 py-2 group-hover:text-orange-500 cursor-pointer"></p>
                            </div>
                            <div className="flex flex-row group">
                                <img
                                    src="/assets/postedContentIcons/save.svg"
                                    alt="Share"
                                    className="cursor-pointer rounded-full group-hover:bg-orange-500/5 p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            
        </div>
        
    )
}