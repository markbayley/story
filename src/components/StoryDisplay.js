"use client";
import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import {
  ArrowUpTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
  TrashIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export const StoryDisplay = ({
  storySelected,
  imagesSelected,
  page,
  setPage,
  audio,
  audioRef,
  storyUnsaved,
  imagesUnsaved,
  setOpen,
  handleSaveBook,
  processing,
  myBooks,
  dismiss,
  setDismiss,
  handleLikeBook,
  selectedBook,
  userId,
  setMessage,
  extractTitleFromStory,
  loading,
  handleDeleteBook,
  message,
  unsaved,
}) => {
  // Helper function to get default image based on page
  const getDefaultImage = (page) => {
    const defaultImages = [pic7];
    return defaultImages[page] || defaultImages[0];
  };
  // Helper Component for Image Display
  const ImageDisplay = ({ imagesSelected, imagesUnsaved, page }) => {
    const imageSrc =
      page == 5
        ? getDefaultImage(page) // Default image at end of book
        : imagesSelected?.length > 0
        ? imagesSelected[page]
        : imagesUnsaved?.length > 0
        ? `data:image/jpeg;base64,${imagesUnsaved[page]}`
        : getDefaultImage(page); // Default image when loading or no images

    return (
      <div className="flex justify-center items-center relative fade-in">
        {<div className="spinner w-full h-full absolute"></div>}
        {imageSrc && (
          <Image
            alt=""
            style={{ borderRadius: "5px 5px 5px 5px", opacity: "0.85" }}
            width={650}
            height={650}
            src={imageSrc}
          />
        )}
      </div>
    );
  };

  const handlePage = (direction) => {
    let max = 5;
    let min = 0;
    if (direction === "down" && page > min) {
      setPage(page - 1);
    } else if (direction === "up" && page < max) {
      setPage(page + 1);
    }
  };

  const prepareText = (storyText) => {
    // Remove the title (assuming it's the first three words followed by two newlines)
    const titleEndIndex = storyText.indexOf("Once upon a time");
    const withoutTitle = storyText.substring(titleEndIndex);

    // Split into paragraphs
    return withoutTitle.split("\n\n");
  };

  const getStoryText = (storyText, currentPage) => {
    if (!storyText) return null;

    // Split the story into paragraphs
    const paragraphs = prepareText(storyText);

    // Calculate the number of paragraphs per page (adjust as needed)
    const paragraphsPerPage = 2; // Example: 2 paragraphs per page
    const startIndex = currentPage * paragraphsPerPage;
    const endIndex = startIndex + paragraphsPerPage;

    // Slice the paragraphs for the current page
    const currentPageParagraphs = paragraphs.slice(startIndex, endIndex);

    // const pages = paragraphs.length / 2;

    if (currentPage == 5) {
      return (
        <div className="h-full flex items-center justify-center text-center mx-6 px-6">
          <div className="text-3xl italic">
            This fine tale was created by...
            <br />
            {selectedBook?.creatorPhotoURL && (
              <div className="w-full flex  justify-center">
                <img
                  src={selectedBook?.creatorPhotoURL}
                  alt="profile-mini"
                  className="h-20 w-20 object-cover border-2 border-stone-700 m-[2px] rounded-full"
                />
              </div>
            )}
            {selectedBook?.creatorName ||
              selectedBook?.displayName ||
              " a mysterious unknown author"}
            <br />
            If you enjoyed reading their story please give it a like!
          </div>
        </div>
      );
    }

    // Render each paragraph separately
    return (
      <div>
        {currentPageParagraphs.map((paragraph, index) => (
          <p key={index} style={{ textAlign: "justify", marginBottom: "1em" }}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  };

 
  


  return (
    <>
      <div className="z-10 right-5 lg:right-10 lg:pb-5 absolute flex flex-col justify-start xl:justify-end items-center h-[60vh] gap-8 w-10 mt-4 xl:mt-0 ">
        {unsaved && selectedBook?.id == undefined && !dismiss && (
          <div
            onClick={handleSaveBook}
            className="animate-pulse max-w-xs border-2 border-rose-500 text-sm text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg shadow-lg relative cursor-pointer"
            role="alert"
          >
            <ArrowUpTrayIcon className="h-9 w-9 p-1" />
          </div>
        )}

        <div
          onClick={() => setPage(5)}
          className=" md:text-amber-500 border-2 rounded-lg md:border-amber-500 hover:cursor-pointer md:hover:bg-amber-500 bg-amber-500 md:hover:text-white md:bg-transparent"
        >
          <UserCircleIcon className="h-9 w-9 p-1" />
        </div>

        <div className=" md:text-indigo-500 border-2 rounded-lg md:border-indigo-500 hover:cursor-pointer md:hover:bg-indigo-500 bg-indigo-500 md:hover:text-white md:bg-transparent">
          <ShareIcon className="h-9 w-9 p-1" />
        </div>

        {selectedBook?.userId != undefined && userId != selectedBook?.userId && (
          <div
            onClick={() => handleLikeBook(selectedBook?.id, userId)}
            className=" md:text-teal-500 border-2 rounded-lg md:border-teal-500 hover:cursor-pointer  md:hover:bg-teal-500 bg-teal-500 md:hover:text-white md:bg-transparent"
          >
            <HandThumbUpIcon className="h-9 w-9  p-1" />
          </div>
        )}

        {userId == selectedBook?.userId && (
          <div
            onClick={() => handleDeleteBook(selectedBook?.id)}
            className=" md:text-pink-600 border-2 rounded-lg md:border-pink-600 hover:cursor-pointer  md:hover:bg-pink-500 bg-pink-500 md:hover:text-white md:bg-transparent"
          >
            <TrashIcon className="h-9 w-9  p-1" />
          </div>
        )}
      </div>

      <div className="fade-in">
        <div
          className=" border-r sm:border-l-1 sm:rounded-xl bg-orange-200 
              xl:bg-gradient-to-r from-orange-200 from-20% via-stone-700 via-50% to-orange-200 to-60% ..."
        >
          {/* Image Section */}

          <div
            className="sm:border-r-2 sm:border-l-1 sm:rounded-xl sm:border-stone-800 mx-auto
               xl:flex
                border xl:h-[87vh]"
          >
            <div
              className="w-full h-full
                 xl:w-1/2
                 flex-1 "
            >
              <div className="m-4 xl:m-12 sm:rounded-tl-xl sm:rounded-bl-xl">
                <ImageDisplay
                  imagesSelected={imagesSelected}
                  page={page}
                  imagesUnsaved={imagesUnsaved}
                />
              </div>
            </div>

            {/* Text Section */}

            <div
              className="flex flex-col w-full 
               xl:w-1/2 
               p-4  xl:p-10 xl:bg-gradient-to-r from-stone-700 from-0% via-orange-200 via-25% to-orange-200 to-90% ... 
                sm:rounded xl:rounded-xl xl:border xl:rounded-tr-lg xl:rounded-br-lg xl:border-l-4 xl:border-stone-700 ... overflow-y-hidden text-stone-900 font-antiqua"
            >
              <div className="flex justify-between text-stone-900">
                <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold capitalize font-antiqua">
                  {storySelected
                    ? extractTitleFromStory(storySelected)
                    : storyUnsaved
                    ? extractTitleFromStory(storyUnsaved)
                    : // : story
                      // ? extractTitleFromStory(story)
                      "Once Upon A Time..."}
                </h1>
                <button
                  onClick={() => {
                    setOpen(false);
                    setMessage("");
                  }}
                  className="w-12 hover:text-orange-500 text-center"
                >
                  <XMarkIcon className="h-6 w-12" />
                  Close
                </button>
              </div>

              <div className="h-full text-stone-900 pr-4 lg:pr-0 text-2xl xl:text-xl 2xl:text-3xl py-4  w-full  no-scrollbar overflow-y-auto">
                {!storySelected && !storyUnsaved && !loading ? (
                  <div className="flex justify-center items-center h-full italic text-center">
                    Please click on a story or create a new story to start
                    reading here.
                  </div>
                ) : (
                  getStoryText(storySelected || storyUnsaved, page)
                )}
              </div>

              {/* Controls Section */}
              <div className="flex-1 flex pt-3 ">
                <div className="w-full flex items-end ">
                  <div className="w-1/3 md:w-1/2   ">
                    {
                      <div className="mr-2  shadow-lg rounded-full border-2 border-stone-700 opacity-80">
                        <audio
                          ref={audioRef}
                          controls
                          src={`${audio}`}
                          className="w-full"
                          style={{ height: "43px", border: "2px" }}
                        />
                      </div>
                    }
                  </div>

                  <div className="w-2/3 md:w-1/2 text-right flex items-center justify-end">
                    {selectedBook?.userId !== userId &&
                      selectedBook?.userId != undefined && (
                        <button
                          onClick={() =>
                            handleLikeBook(selectedBook?.id, userId)
                          }
                          className={
                            "flex relative px-4 py-2 mx-3 text-stone-950 rounded-full hover:bg-orange-400 shadow-lg border-2 bg-transparent border-stone-500 transition ease-in-out hover:scale-110 duration-300"
                          }
                        >
                          <HandThumbUpIcon className="h-6 w-6 " />
                          <span
                            className={
                              selectedBook?.likedBy?.includes(userId)
                                ? "absolute -top-3 -right-3 px-2 font-sans  text-sm bg-teal-500 border-2 border-teal-500 rounded-bl-xl text-white rounded-full"
                                : "absolute -top-3 -right-3 px-2 font-sans  text-sm bg-slate-700 border-2 border-teal-500 rounded-bl-xl text-teal-500 rounded-full"
                            }
                          >
                            {selectedBook?.likes || 0}
                          </span>
                        </button>
                      )}
                    <button
                      onClick={() => handlePage("down")}
                      className="transition ease-in-out hover:scale-105 duration-300 px-3 py-2 text-stone-950 bg-transparent rounded-tl-full rounded-bl-full hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>

                    <button
                      type="submit"
                      className="transition ease-in-out hover:scale-105 duration-300 px-4 py-2 mx-1  text-stone-950 bg-transparent font-sans font-semibold rounded hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      {page}
                    </button>
                    <button
                      onClick={() => handlePage("up")}
                      type="submit"
                      className="transition ease-in-out hover:scale-105 duration-300 px-3 py-2  text-stone-950 bg-transparent rounded-tr-full rounded-br-full hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Controls Section End*/}

              {/* Text Section End*/}
            </div>
          </div>

          {/* Image Section */}
        </div>
      </div>
      {/* Fade in end */}

      {/* Error Start */}

      {/* )} */}
      {/* ErrorEnd */}
    </>
  );
};
