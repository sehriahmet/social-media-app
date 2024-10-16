import SearchBar from "@/components/shared/SearchBar"

const Home = () => {

 return (
  <div>
    <header className="flex flex-row items-center justify-between w-full h-12 border-b">
      <h1 className="font-bold text-xl ml-4">Home</h1>
      <div className="mr-4">
        <img src="/assets/cardTitleIcon/sparks.svg" alt="Sparks" />
      </div>
    </header>
    <div className="flex justify-center items-center p-4 ">
    <SearchBar />
    </div>

    <div className="border-r-[0.5px] border-b-[0.5px] flex items-stretch py-4 space-x-2 border-gray-600 h-32 relative">
      <div className="w-12 h-12 bg-slate-400 rounded-full flex-none mt-2"></div>
      <div className="flex flex-col w-full h-full">
        <input
          type="text"
          className="w-full- h-full bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
          placeholder="What's Happening?"
        />
        <div className="w-full justify-between items-center flex">
          <div className="flex flex-row px-4 space-x-4">
            <img src="/assets/postIcon/addPicture.svg" alt="Picture" />
            <img src="/assets/postIcon/Vector.svg" alt="Vector" />
            <img src="/assets/postIcon/stats.svg" alt="Stats" />
            <img src="/assets/postIcon/smiley.svg" alt="Smiley" />
            <img src="/assets/postIcon/history.svg" alt="History" />

          </div>
          <div className="w-full max-w-[100px]">
            <button className="rounded-full bg-orange-500 text-white py-2 px-4 font-bold text-sm text-center hover:bg-opacity-80 transition duration-200">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
 )
}

export default Home
