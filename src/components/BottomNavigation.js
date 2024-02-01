export const BottomNavigation = ({myBooks, books, extractTitleFromStory }) => {
  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 text-3xl text-orange-300 font-bold antiqua px-4">My Stories
    <div className="  flex justify-center gap-6 text-orange-300 roboto font-light text-xs mt-2 ">


              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 text-white text-sm lg:text-auto">
              
              {books.map((book, index) => (
    <div key={index} className="rounded ">
   
    <img src={book.imageUrls[0]} className=" rounded-xl" />
    <p className="text-center py-1 font-light ">{extractTitleFromStory(book.story)}</p>
    </div>))}
    </div>

      {/* <div className="bg-[url('../../public/home.png')] rounded bg-cover p-4 border"></div>
      <div className="bg-[url('../../public/fruit.png')] rounded bg-cover p-4 border"></div>
      <div className="bg-[url('../../public/flower.png')] rounded bg-cover p-4 border"></div>
      <div className="bg-[url('../../public/profile.png')] rounded bg-cover p-4 border"></div>
      <div className="bg-[url('../../public/profile.png')] rounded bg-cover p-4 border"></div> */}
    </div>
    </div>
    </>
  );
};


