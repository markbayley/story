import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
// import pic7 from "/public/book2.jpg";
import { myBooks } from "./../app/firebase/data.js";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const BottomNavigation = ({
  books,
  allBooks,
  extractTitleFromStory,
  handlePreviewClick,
  loading,
  processing,
  handleDeleteBook,
  handlePreviewAll,
  myStories,
  setMyStories,
  handleLikeBook,
  userId,
}) => {
  return (
    <>
      {books && (
        <div className="xl:fixed bottom-0 left-0 right-0 text-2xl text-orange-300 font-bold font-antiqua px-5">
          <button
            className={!myStories ? "text-orange-300" : "text-gray-500"}
            onClick={() => setMyStories(false)}
          >
            Top Stories
          </button>
          { myStories &&
          <button
            className={
              myStories ? "text-orange-300 mx-3" : "text-gray-500 mx-3"
            }
            onClick={() => setMyStories(true)}
          >
            My Stories
          </button>
}
          <div className="flex justify-start text-orange-300 font-light">
            {myStories ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 md:text-xs mb-3">
                {books.map((book) => (
                  <div
                    onClick={() => handlePreviewClick(book.id)}
                    key={book.id}
                    className="rounded relative flex items-end justify-center cursor-pointer hover:scale-[1.05] ease-in duration-100"
                  >
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLikeBook(book.id);
                      }}
                      className=" z-10 right-1 top-1 absolute hover:bg-teal-500 rounded-tl-full rounded-bl-full rounded-tr-full hover:text-white text-teal-500 border-2 border-teal-500 bg-slate-700"
                    >
                      <div className="relative h-10 w-10 lg:h-5 lg:w-5 font-inter font-bold rounded-full text-lg lg:text-sm flex justify-center items-center text-center p-3 shadow-xl">
                        <span className="absolute  left-0 top-0 text-white"></span>
                        {book.likes}
                      </div>
                    </button>

                    <div className="z-10 left-1 top-1 absolute hover:bg-teal-500 rounded-tl-lg text-teal-500 border-2 border-teal-500 hover:border-slate-700 rounded-full bg-slate-700 hover:text-slate-700">
                      {userId == book.userId ? (
                        <TrashIcon className="h-10 w-10 lg:h-6 lg:w-6 p-1" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="bg-cover relative w-[100vw] aspect-square border-4  border-[#15161b] hover:border-4 hover:border-sky-900 rounded-r-xl flex items-end">
                    <h5 className="pr-3 pl-1 xl:py-1 absolute font-medium text-gray-300  tracking-wide  hover:text-gray-300 z-10 bg-gradient-to-r from-sky-950 from-0% to-[#3c3232] to-70% ... rounded-tr-full rounded-br-full border-b-2 border-gray-900 opacity-90 drop-shadow-2xl">
                          {extractTitleFromStory(book.story) || "Untitled"}
                        </h5>

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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 md:text-xs mb-3">
                {allBooks
                  .slice()
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .slice(0, 12)
                  .map((book) => (
                    <div
                      onClick={() => handlePreviewAll(book.id)}
                      key={book.id}
                      className="rounded relative flex items-end justify-center cursor-pointer hover:scale-[1.05] ease-in duration-100"
                    >
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          handleLikeBook(book.id);
                        }}
                        className=" z-10 right-1 top-1 absolute hover:bg-teal-500 rounded-tl-full rounded-bl-full rounded-tr-full hover:text-white text-teal-500 border-2 border-teal-500 bg-slate-700"
                      >
                        <div className="relative h-10 w-10 lg:h-5 lg:w-5 font-inter font-bold rounded-full text-md flex justify-center items-center text-center p-3 shadow-xl">
                          <span className="absolute  left-0 top-0 text-white"></span>
                          {book.likes}
                        </div>
                      </button>

                      <div className="z-10 left-1 top-1 absolute hover:bg-teal-500 rounded-tl-lg text-indigo-200 border-2 border-indigo-600 hover:border-slate-700 rounded-full bg-slate-700 hover:text-slate-700">
                        {userId == book.userId ? (
                          <UserCircleIcon className="h-10 w-10 lg:h-6 lg:w-6" />
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="bg-cover relative w-[100vw] aspect-square border-4  border-[#15161b] hover:border-4 hover:border-sky-900 rounded-r-xl flex items-end">
                        <h5 className="p-1 absolute font-medium text-gray-300 tracking-wide  hover:text-gray-300 z-10 bg-gradient-to-r from-sky-950 from-0% to-[#3c3232] to-70% ... rounded-tr-full rounded-br-full px-1 border-b-2 border-gray-900 opacity-90 drop-shadow-2xl">
                          {extractTitleFromStory(book.story) || "Untitled"}
                        </h5>

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
            )}
          </div>
        </div>
      )}
    </>
  );
};
