"use client"

import { useState, useRef, useEffect } from 'react';
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const LeftSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleClickOutside: EventListener =  (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // console.log(isOpen)
    return (
        <div ref={sidebarRef}>
        <button className='lg:hidden fixed top-1 left-2 z-50 bg-orange p-2 rounded-full' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <img src="/assets/Menu.svg" alt="menu" className='bg-orange-200/20 rounded-md' /> : <img src="/assets/Menu.svg" alt="menu"/>}
        </button>

        <section className={`lg:flex ${isOpen ? 'flex' : 'hidden'} fixed w-54 flex-col h-screen items-end justify-between space-x-2 rounded-sm bg-white p-4 overflow-auto z-30`}>
            <div className="justify-between mt-32">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route);

                    return (

                        <Link
                            href={link.route}
                            key={link.label}
                            className='hover:bg-black/5 transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-4 px-6'
                        >
                            <Image
                                src={ isActive ? link.imgURLactive : link.imgURLinactive}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            
                            <p className="font-bold ml-4">{link.label}</p>

                        </Link>

                    )}
                )}
                <button className="space-x-4 w-52 mt-24 ml-4 rounded-full bg-orange-500 text-white py-3 px-2 font-bold text-sm text-center hover:bg-opacity-80 transition duration-200">
                    New Post
                </button>

            </div>
            
            <button className="space-x-4 w-56 ml-4 mb-4 rounded-full text-black py-3 px-2 font-bold text-sm text-center hover:bg-black/10 transition duration-200">
                <div className="flex justify-between items-center space-x-2">
                    <div className="flex space-x-2 items-center">
                        <div className="rounded-full bg-slate-400 w-10 h-10"><Image width={128} height={128} src="/assets/avatarImages/avatar-6.jpg" alt="More" className="h-full w-full object-cover rounded-full"/></div>
                        <div className="text-left text-sm">
                            <div className="font-semibold">travelbug</div>
                            <div className="font-light text-xs">@travelbug</div>
                        </div>
                    </div>
                    <img src="/assets/postedContentIcons/options.svg" alt="More" />
                </div>
            </button>
        </section>
        </div>
    )
}

export default LeftSidebar