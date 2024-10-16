import SearchBar from "@/components/shared/SearchBar"

const Home = () => {
 return (
  <div>
    {/* Header section */}
    <section className='flex flex-row items-center justify-between w-full h-12 backdrop-blur sticky top-0'>
      <h1 className="font-bold text-xl ml-4">Home</h1>
      <div className="mr-4">
        <img src="/assets/cardTitleIcon/sparks.svg" alt="Sparks" />
      </div>
    </section>

    {/* Searchbar section */}
    <section className="flex justify-center items-center p-4 border-t">
      <SearchBar />
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
    <section className="flex flex-col">
      {
        Array.from({ length:5 }).map((_,i)=>(
          <div key={i} className="border-r-[0.5px] p-4 border-b-[0.5px] flex space-x-4 w-full">
            <div>
              <div className="w-12 h-12 bg-slate-400 rounded-full flex-none"></div>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex items-center justify-between">
                <span className="flex space-x-2">
                  <div className="font-bold">Club of Coders</div>
                  <div className="text-gray-500">@clubofcoders</div>
                  <div className="text-gray-500">.5m</div>
                </span>
                <div><button className="rounded-sm hover:bg-black/5" ><img src="/assets/postedContentIcons/options.svg" alt="More" /></button></div>
              </div>
              <div className="">
                text area
              </div>
              <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>
              <div className="flex items-center justify-between w-3/4">
                <div><button className="rounded-full hover:bg-black/5 p-2" ><img src="/assets/postedContentIcons/comment.svg" alt="Comment" /></button></div>
                <div><button className="rounded-full hover:bg-black/5 p-2" ><img src="/assets/postedContentIcons/options-1.svg" alt="Repost" /></button></div>
                <div><button className="rounded-full hover:bg-black/5 p-2" ><img src="/assets/postedContentIcons/heart.svg" alt="Like" /></button></div>
                <div><button className="rounded-full hover:bg-black/5 p-2" ><img src="/assets/postedContentIcons/save.svg" alt="Share" /></button></div>
              </div>
            </div>
          </div>
        
      ))}
    </section>

  </div>
 )
}

export default Home
