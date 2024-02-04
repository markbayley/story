import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { StoryFiller } from "./StoryFiller";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const StoryDisplay = ({
  story,
  images,
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
}) => {
  // Helper function to get default image based on page
  const getDefaultImage = (page) => {
    const defaultImages = [pic7];
    return defaultImages[page] || defaultImages[0];
  };
  // Helper Component for Image Display
  const ImageDisplay = ({ images, imagesUnsaved, page }) => {
    const imageSrc =
      page == 5 ? getDefaultImage(page) :
      images || (imagesUnsaved && images?.length > 0)
        ? images[page]
        : imagesUnsaved?.length > 0
        ? `data:image/jpeg;base64,${imagesUnsaved[page]}`
        : getDefaultImage(page);
    return (
      <div className="flex justify-center items-center relative">
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
    let max = 5;
    let min = 0;
    if (direction === "down" && page > min) {
      setPage(page - 1);
    } else if (direction === "up" && page < max) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="fade-in sm:mt-4">
        <div
          className="lg:mx-[5%] xl:mx-[10%] border-r sm:border-l-1 sm:rounded-xl bg-orange-200 
              sm:bg-gradient-to-r from-orange-200 from-20% via-stone-700 via-50% to-orange-200 to-60% ..."
        >
          {/* Image Section */}
          <div className="sm:border-r-2 sm:border-l-1 sm:rounded-xl sm:border-stone-800 mx-auto sm:flex lg:skew-x-1 border">
            <div className="w-full h-full sm:w-1/2 sm:pb-4 flex-1 lg:pt-2 lg:ml-2">
              <div className="m-4 sm:rounded-tl-xl sm:rounded-bl-xl">
                <ImageDisplay
                  images={images}
                  page={page}
                  imagesUnsaved={imagesUnsaved}
                />
              </div>
            </div>
            {/* Text Section */}
            <div
              className="flex flex-col w-full sm:w-1/2 pl-4 lg:pl-6 sm:pt-6 pr-4 sm:bg-gradient-to-r from-stone-700 from-0% via-orange-200 via-25% to-orange-200 to-90% ... h-[87vh] 
                sm:rounded lg:rounded-xl sm:border sm:rounded-tr-lg sm:rounded-br-lg sm:border-l-4 sm:border-stone-700 ... overflow-y-hidden text-stone-900 antiqua"
            >
              <div className="flex justify-between lg:px-4 pb-4 text-stone-900">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold capitalize antiqua">
                  {story
                    ? story?.split("Once")[0]
                    : storyUnsaved
                    ? storyUnsaved?.split("Once")[0]
                    : "Once Upon A Time..."}
                </h1>
                <button
                  onClick={() => setOpen(false)}
                  className="w-12 hover:text-gray-500 text-center"
                >
                  <XMarkIcon className="h-6 w-12"/>
                  Close
                </button>
              </div>

              {!story && !storyUnsaved ? 
                <StoryFiller loading={loading} />
               :  
                <div className="text-stone-900 xs:pr-4 lg:pr-0 lg:pl-4 text-2xl xl:text-3xl w-full h-50">
                  {page == 0
                    ? "Once " +
                      story?.substring(0, 450).split("Once")[1] +
                      "..."
                    : "..." + story?.substring(450*page, 450*page+450) + "..." }
                
                </div>
}
       
              {/* Controls Section */}
              <div className="flex-1 flex items-end pb-6">
                <div className="w-full flex pr-0 lg:pr-2 ">
                  <div className="w-1/2 text-left ">
                    {
                      <div className="mt-3 mr-2 lg:ml-4 shadow-lg rounded-full border-2 border-stone-700 opacity-60">
                        <audio
                          ref={audioRef}
                          controls
                          src={`${audio}`}
                          className="w-full"
                          style={{ height: "35px", border: "1px" }}
                        />
                      </div>
                    }
                  </div>

                  <div className="w-1/2 text-right">
                    <button
                      onClick={() => handlePage("down")}
                      className="mt-3 px-4 py-1 text-stone-950 bg-transparent rounded hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      {"<"}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 mx-1 text-stone-950 bg-transparent rounded hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      {"Page " + page}
                    </button>
                    <button
                      onClick={() => handlePage("up")}
                      type="submit"
                      className="px-4 py-1  text-stone-950 bg-transparent rounded hover:bg-orange-400 shadow-lg border-2 border-stone-500"
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-2 mr-2">
            </div>
          </div>
        </div>
      </div>

      {imagesUnsaved.length > 0 && (
        <div
          className={
            processing
              ? "animate-pulse text-orange-400 px-2 hover:text-orange-400 fixed bottom-4 left-4 z-20"
              : "text-white px-2 hover:text-gray-500 fixed bottom-4 left-4 z-20"
          }
        >
          <div
            className="max-w-xs bg-red-500 text-sm text-white rounded-xl shadow-lg relative"
            role="alert"
          >
            <div className="flex p-4">
              {processing ? "Saving" : "Save?"}{" "}
              <ArrowUpTrayIcon className="h-6 mx-2" />
              <div className="ms-auto">
                <button
                  onClick={handleSaveBook}
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
    </>
  );
};
