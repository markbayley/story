import Image from "next/image";
import pic7 from "/public/book.png";
// import pic7 from "/public/book2.jpg";

export const BottomNavigation = ({
  books,
  extractTitleFromStory,
  handlePreviewClick,
  loading,
  processing,
}) => {
  return (
    <>
      {books && (
        <div className="lg:fixed bottom-0 left-0 right-0 text-2xl text-orange-300 font-bold antiqua px-4">
          { books.length > 0  ? "My Stories" : "No Stories Saved" }
          <div className="flex justify-start  text-orange-300  font-light  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2 text-white md:text-xs mb-3">
              {books.map((book) => (
                <button
                  onClick={() => handlePreviewClick(book.id)}
                  key={book.id}
                  className="rounded relative flex items-end justify-center"
                >
              
                  {/* <img
                    src={book.imageUrls[0] ? book.imageUrls[0] : pic7}
                    className="rounded-xl border-4 border-sky-950 hover:border-4 hover:border-orange-300 h-full w-full"
                    alt="preview"
                  /> */}
                   <div className="hover:bg-[url('../../public/background3.png')] bg-cover relative h-96 w-[100vw] md:h-28 md:w-28 border border-[#15161b] hover:border-4 hover:border-sky-900 rounded-r-xl flex items-center">
                   <h6 className="p-1  absolute font-medium font-serif z-10 bg-gradient-to-r from-sky-950 from-0%   to-[#3c3232] to-70% ... rounded-tr-full rounded-br-full w-5/6 border-b-2 border-gray-900 opacity-90 drop-shadow-2xl

">
                    {extractTitleFromStory(book.story) || "Untitled"}
                  </h6>

                    <Image
                    //book.imageUrls && book.imageUrls.length > 0 ? book.imageUrls[0] :
      src={book.imageUrls && book.imageUrls.length > 0 ? book.imageUrls[0] : pic7}
      alt="preview"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      //objectFit="cover" 
      className={" rounded-r-md"}
    /></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
