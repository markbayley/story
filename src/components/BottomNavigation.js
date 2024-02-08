import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { TrashIcon } from "@heroicons/react/24/outline";
// import pic7 from "/public/book2.jpg";

export const BottomNavigation = ({
  books,
  extractTitleFromStory,
  handlePreviewClick,
  loading,
  processing,
  handleDeleteBook,
}) => {
  return (
    <>
      {books && (
        <div className="xl:fixed bottom-0 left-0 right-0 text-2xl text-orange-300 font-bold antiqua px-5">
          {books.length > 0 ? "My Stories" : "No Stories Saved"}
          <div className="flex justify-start text-orange-300 font-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 md:text-xs mb-3">
              {books.map((book) => (
                <div
                  onClick={() => handlePreviewClick(book.id)}
                  key={book.id}
                  className="rounded relative flex items-end justify-center cursor-pointer"
                >
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteBook(book.id);
                    }}
                    className=" z-10 right-0 top-0 absolute hover:bg-pink-700 rounded-tr-lg rounded-md hover:text-white text-pink-700"
                  >
                    <TrashIcon className="h-10 w-10 lg:h-5 lg:w-5 m-1 rounded-tr-md rounded-sm" />
                  </button>
                  <div className="bg-cover relative w-[100vw] aspect-square border-4  border-[#15161b] hover:border-4 hover:border-sky-900 rounded-r-xl flex items-center">
                    <h6 className="p-1 absolute font-medium   hover:text-gray-300 z-10 bg-gradient-to-r from-sky-950 from-0% to-[#3c3232] to-70% ... rounded-tr-full rounded-br-full w-5/6 border-b-2 border-gray-900 opacity-90 drop-shadow-2xl">
                      {extractTitleFromStory(book.story) || "Untitled"}
                    </h6>

                    <Image
                      src={pic7}
                        // book.imageUrls && book.imageUrls.length > 0
                        //   ? book.imageUrls[0]
                        //   :
                    
                      alt="preview"
                    
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      cover="true"
                      className={"rounded-r-md"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
