import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export const StorySelector = ({
  myBooks,
  allBooks,
  extractTitleFromStory,
  handlePreviewMine,
  handlePreviewAll,
  myStoriesSelected,
  setMyStoriesSelected,
  handleLikeBook,
  userId,
  handleDeleteBook,
  setMessage,
  currentSliceIndex,
  setCurrentSliceIndex,
  selectedBook,
}) => {
  const PreviewContent = ({ book }) => {
    // console.log("selectedBook", selectedBook?.id, "book.id", book?.id);

    return (
      <>
        {/* User Icon */}
        <div
          className={
            userId != book.userId
              ? "z-10 left-1 top-1 absolute rounded-tl-lg text-white border-2 border-amber-500 rounded-full bg-slate-700"
              : "z-10 left-1 top-1 absolute bg-amber-500 rounded-tl-lg text-white border-2 border-amber-500 rounded-full"
          }
        >
          {/* {userId == book.userId && */}
          <div className="flex items-center  pr-1">
            <span className=""> {book?.creatorName || book?.displayName} </span>
            {book?.creatorPhotoURL ? (
              <img
                src={book?.creatorPhotoURL}
                alt="profile-mini"
                className="h-10 w-10 lg:h-5 lg:w-5 object-cover border-2 m-[2px] rounded-full"
              />
            ) : (
              <UserCircleIcon className="h-10 w-10 lg:h-6 lg:w-6" />
            )}
          </div>
          {/* } */}
        </div>
        {/* Likes Icon */}
        <button
          // onClick={(event) => {
          //   event.stopPropagation();
          //   handleLikeBook(book.id);
          // }}
          className={
            book?.likedBy?.includes(userId)
              ? "z-10 right-1 top-1 absolute bg-teal-500 rounded-tl-full rounded-full rounded-br   text-white  border-2 border-teal-500 "
              : "z-10 right-1 top-1 absolute  rounded-tl-full rounded-full rounded-br    text-teal-500 border-2 border-teal-500 bg-slate-700"
          }
        >
          <div className="relative h-10 w-10 lg:h-5 lg:w-5 rounded-full text-lg md:text-md lg:text-xs flex justify-center items-center text-center p-3 shadow-xl">
            <span className="absolute  left-0 top-0 text-white"></span>
            {book.likes}
          </div>
        </button>
        {/* Delete Icon */}
        {/* <div
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteBook(book.id);
          }}
          className="z-10 right-1 bottom-1 absolute hover:bg-pink-500 rounded text-pink-500 border-2 border-pink-500  bg-slate-700 hover:text-slate-700"
        >
          {userId == book.userId && (
            <TrashIcon className="h-10 w-10 lg:h-6 lg:w-6 p-1" />
          )}
        </div> */}
        {/* Image */}
        <div
          className={
            "bg-cover relative w-[100vw] aspect-square rounded-tr-xl flex items-end"
          }
        >
          {/* Title */}
          <h5 className="p-1 px-2 absolute text-white tracking-wide font-light w-auto text-center z-10 bg-gradient-to-r from-sky-950 from-0% to-[#3c3232] to-100%  rounded  font-antiqua border-b-2 border-gray-900 opacity-90 drop-shadow-2xl">
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
            className={selectedBook?.id != book?.id ? "rounded-tr-xl z-5" : " animate-pulse rounded-tr-xl z-5" }
          />
        </div>
      </>
    );
  };

  const booksPerPage = 6;

  const handleSlider = (direction) => () => {
    setCurrentSliceIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (direction === "right") {
        // Move to the next set of books if not at the end
        newIndex = Math.min(
          prevIndex + booksPerPage,
          allBooks.length - booksPerPage
        );
      } else if (direction === "left") {
        // Move to the previous set of books if not at the start
        newIndex = Math.max(prevIndex - booksPerPage, 0);
      }
      return newIndex;
    });
  };

  return (
    <>
      <div className="pt-10 lg:mt-16 text-2xl px-5 ">
        {/* Stories Sorted By Likes */}
        <div className="font-sans text-sm  w-full  rounded-t-lg flex justify-end pr-8 gap-2">
          <button
            className={
              !myStoriesSelected
                ? "text-teal-500 bg-slate-800  rounded-t-lg px-3 py-2  border-x-2 border-t-2 border-teal-500"
                : "text-gray-500 hover:text-teal-500 bg-slate-800  rounded-t-lg px-3 py-2 border-x border-t border-gray-500"
            }
            onClick={() => setMyStoriesSelected(false)}
          >
            Most Liked
          </button>
          {/* User Stories */}
          {/* {myBooks.length > 0 && ( */}
          <button
            className={
              myStoriesSelected
                ? "text-amber-500 bg-slate-800  rounded-t-lg px-3  py-2 border-x-2 border-t-2 border-amber-500"
                : "text-gray-500  hover:text-amber-500 bg-slate-800  rounded-t-lg px-3  py-2 border-x border-t border-gray-500"
            }
            onClick={
              myBooks.length > 0
                ? () => setMyStoriesSelected(true)
                : () => setMessage("No Stories Created")
            }
          >
            My Stories
          </button>
        </div>

        <div className="flex justify-end text-amber-500">
          {/* Map User Stories */}
          {myStoriesSelected ? (
            <div
              dir="rtl"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  xl:grid-cols-6  gap-2 text-sm mb-3   "
            >
              {myBooks.map((book) => (
                <div
                  onClick={() => handlePreviewMine(book.id)}
                  key={book.id}
                  className={
                    selectedBook?.id != book?.id
                      ? "relative flex items-end justify-center cursor-pointer fade-in border-2 border-[#15161b] hover:border-2 transition ease-in-out hover:border-amber-500 duration-200 rounded-tr-xl  "
                      : "relative flex items-end justify-center cursor-pointer fade-in border-2 border-amber-500 hover:border-2 transition ease-in-out hover:border-amber-500 duration-200 rounded-tr-xl "
                  }
                >
                  <PreviewContent book={book} />
                </div>
              ))}
            </div>
          ) : (
            <div className=" w-full relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6  gap-2 text-sm mb-3">
                <button
                  onClick={handleSlider("left")}
                  className=" h-full w-12 absolute -left-20 hover:text-gray-500"
                >
                  <ChevronLeftIcon className="h-10 w-10" />
                </button>

                {allBooks
                  .slice()
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .slice(currentSliceIndex, currentSliceIndex + booksPerPage)
                  .map((book) => (
                    <div
                      onClick={() => handlePreviewAll(book.id)}
                      key={book.id}
                      className={
                        selectedBook?.id != book?.id
                          ? " relative flex items-end justify-center cursor-pointer fade-in border-2 border-[#15161b] hover:border-2 transition ease-in-out hover:border-teal-500 duration-200 rounded-tr-xl  "
                          : " relative flex items-end justify-center cursor-pointer fade-in border-2 border-teal-500 hover:border-2 transition ease-in-out hover:border-teal-500 duration-200 rounded-tr-xl "
                      }
                    >
                      <PreviewContent book={book} />
                    </div>
                  ))}

                <button
                  onClick={handleSlider("right")}
                  className=" h-full w-12 absolute -right-20 hover:text-gray-500"
                >
                  <ChevronRightIcon className="h-10 w-10" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
