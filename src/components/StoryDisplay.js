import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { StoryFiller } from "./StoryFiller";
import {
  ArrowUpTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const StoryDisplay = ({
  storySelected,
  imagesSelected,
  page,
  setPage,
  audio,
  audioRef,
  loading,
  storyUnsaved,
  imagesUnsaved,
  setOpen,
  handleSaveBook,
  processing,
  message,
  books,
  dismiss,
  setDismiss,
  story,
  handleLikeBook,
  selectedBook,
  userId
}) => {
  // Helper function to get default image based on page
  const getDefaultImage = (page) => {
    const defaultImages = [pic7];
    return defaultImages[page] || defaultImages[0];
  };
  // Helper Component for Image Display
  const ImageDisplay = ({ imagesSelected, imagesUnsaved, page }) => {
    const imageSrc =
      page == 6
        ? getDefaultImage(page)
        : imagesSelected || (imagesUnsaved && imagesSelected?.length > 0)
        ? imagesSelected[page]
        : imagesUnsaved?.length > 0
        ? `data:image/jpeg;base64,${imagesUnsaved[page]}`
        : getDefaultImage(page);
    return (
      <div className="flex justify-center items-center relative fade-in">
        {loading && <div className="spinner w-full h-full absolute"></div>}
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
    let max = 6;
    let min = 0;
    if (direction === "down" && page > min) {
      setPage(page - 1);
    } else if (direction === "up" && page < max) {
      setPage(page + 1);
    }
  };

  const getStoryText = (storyText, currentPage) => {
    if (!storyText) return "";

    const pageTextLength = 450; // Defines the length of text per page
    let startIndex = currentPage * pageTextLength;
    let endIndex = startIndex + pageTextLength;

    // Adjust startIndex for pages after the first one
    if (currentPage > 0) {
      while (startIndex > 0 && storyText[startIndex - 1] !== " ") {
        startIndex--;
      }
    }

    // Adjust endIndex to not cut off in the middle of a word
    if (endIndex < storyText.length) {
      while (endIndex < storyText.length && storyText[endIndex] !== " ") {
        endIndex--;
      }
    }

    // Extract the text snippet for the current page
    const textSnippet = storyText.substring(startIndex, endIndex).trim();

    // Special handling for the first page to ensure "Once" is included
    if (currentPage === 0) {
      return "Once " + textSnippet.split("Once")[1] + "...";
    } else {
      return textSnippet + (endIndex < storyText.length ? "..." : "");
    }
  };

  

  console.log("selectedBook", selectedBook, userId);


  return (
    <>
      <div className="fade-in">
        <div
          className="md:mx-[15%] lg:mx-[3%] xl:mx-[10%] border-r sm:border-l-1 sm:rounded-xl bg-orange-200 
              lg:bg-gradient-to-r from-orange-200 from-20% via-stone-700 via-50% to-orange-200 to-60% ..."
        >
          {/* Image Section */}

          <div
            className="sm:border-r-2 sm:border-l-1 sm:rounded-xl sm:border-stone-800 mx-auto
               lg:flex
                border xl:h-[87vh]"
          >
            <div
              className="w-full h-full
                 lg:w-1/2
                 flex-1 "
            >
              <div className="m-4 sm:rounded-tl-xl sm:rounded-bl-xl">
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
               lg:w-1/2 
               p-4 lg:bg-gradient-to-r from-stone-700 from-0% via-orange-200 via-25% to-orange-200 to-90% ... 
                sm:rounded lg:rounded-xl lg:border lg:rounded-tr-lg lg:rounded-br-lg lg:border-l-4 lg:border-stone-700 ... overflow-y-hidden text-stone-900 antiqua"
            >
              <div className="flex justify-between text-stone-900">
                <h1 className="text-4xl xl:text-5xl font-bold capitalize antiqua">
                  {storySelected
                    ? storySelected?.split("Once")[0]
                    : storyUnsaved
                    ? storyUnsaved?.split("Once")[0]
                    : story
                    ? story?.split("Once")[0]
                    : "Once Upon A Time..."}
                </h1>
                <button
                  onClick={() => setOpen(false)}
                  className="w-12 hover:text-orange-500 roboto text-center"
                >
                  <XMarkIcon className="h-6 w-12" />
                  Close
                </button>
              </div>

              <div className=" text-stone-900 xs:pr-4 lg:pr-0 text-3xl xl:text-[2.15rem] py-4  w-full h-50 no-scrollbar overflow-y-auto">
                {!storySelected && !storyUnsaved && !story ? (
                  <StoryFiller loading={loading} />
                ) : (
                  getStoryText(storySelected || storyUnsaved || story, page)
                )}
              </div>

              {/* Controls Section */}
              <div className="flex-1 flex ">
                <div className="w-full flex items-end ">
                  <div className="w-1/3 md:w-1/2  ">
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
                    <button
                      onClick={() => handleLikeBook(selectedBook?.id, userId)}
                      className="flex relative px-4 py-2 mx-3 text-stone-950 bg-transparent rounded-full hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      <HandThumbUpIcon className="h-6 w-6" />
                      <span className="absolute -top-2 -right-2 px-2 bg-orange-400 text-white rounded-full">
                        {selectedBook?.likes}
                      </span>
                    </button>
                    <button
                      onClick={() => handlePage("down")}
                      className=" px-3 py-2 text-stone-950 bg-transparent rounded-tl-full rounded-bl-full hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 mx-1  text-stone-950 bg-transparent  roboto rounded hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      {page}
                    </button>
                    <button
                      onClick={() => handlePage("up")}
                      type="submit"
                      className="px-3 py-2  text-stone-950 bg-transparent rounded-tr-full rounded-br-full hover:bg-orange-400 shadow-lg border-2 border-stone-500"
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
      {imagesUnsaved?.length > 0 && !dismiss && (
        <div
          className={
            processing
              ? "animate-pulse text-orange-400 px-2 hover:text-orange-400 fixed bottom-4 left-4 z-20"
              : "text-white px-2 hover:text-gray-500 fixed bottom-4 left-4 z-20"
          }
        >
          <div
            onClick={handleSaveBook}
            className="max-w-xs bg-red-500 text-sm text-white rounded-xl shadow-lg relative cursor-pointer"
            role="alert"
          >
            <div className="flex p-4">
              { selectedBook?.id === bookId ? setDismiss(true)
              : processing
                ? "Saving"
                : books.length < 12
                ? "Save Story"
                : "Maximum Books Saved"}{" "}
              <ArrowUpTrayIcon className="h-6 mx-2" />
              <div className="ms-auto">
                <button
                  onClick={() => setDismiss(!dismiss)}
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ErrorEnd */}
    </>
  );
};
