import Search from "./Search";

const Allmemes = ({ memes, handleSearchChange  }) => {
    
  

   const allmemes = memes.map((meme) => {
     const created = new Date(meme.created_at);
     const now = new Date();
     const diffInMs = now.getTime() - created.getTime();
     let formattedDate;
     if (diffInMs < 1000 * 60 * 60) {
       const diffInMin = Math.floor(diffInMs / (1000 * 60));
       formattedDate = `${diffInMin} min ago`;
     } else if (diffInMs < 1000 * 60 * 60 * 24) {
       const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));
       formattedDate = `${diffInHrs} hrs ago`;
     } else {
       const diffInDays = Math.floor(diffInMs / (1000 * 3600 * 24));
       formattedDate = `${diffInDays} days ago`;
     }
 
     return (
       <div>
        
       <div
         key={meme.id}
         className="text-white bg-slate-100 p-2 mt-5 border w-2/4 ml-80 rounded-lg shadow"
       >
         <div className="flex justify-between border mb-1 md:border-slate-300 md:border-b-1 md:border-t-0 md:border-r-0 md:border-l-0  ">
            {meme.user  && <p className="mr-4  text-teal-500 font-bold "> <span className="text-orange-600">created by:</span>  {meme.user.username}</p>}
            <p className="text-gray-500 mb-0">{formattedDate}</p>
         </div>
         <p className="">
           <span className="text-gray-900 font-bold"> "{meme.title}" </span>{" "}
          
         </p>
         <p className="">
           <span className="text-gray-900 font-bold">"{meme.message}"</span>
         </p>
       </div>
       </div>
     );
   });
 
   return <div>
              <Search handleSearchChange={handleSearchChange} />
             <div className=" mt-10 pb-20 ">
              {allmemes}
             </div>
            </div>
 };
 
 export default Allmemes;
 