export const BottomNavigation = ({ books, extractTitleFromStory, handlePreviewClick }) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 text-2xl text-orange-300 font-bold antiqua px-4">
        My Stories
        <div className="  flex justify-center gap-6 text-orange-300 roboto font-light text-xs mt-2 ">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 text-white text-sm lg:text-auto">
            {books.map((book, index) => (
            
                <button onClick={() => handlePreviewClick(book.id)} key={index} className="rounded ">

                <img
                  src={book.imageUrls[0]}
                  className=" rounded-xl hover:border-2 hover:border-orange-300"
                />
                <p className="text-center py-1 font-light ">
                  {extractTitleFromStory(book.story) || "Untitled"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
