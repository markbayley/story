import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { StoryFiller } from "./StoryFiller";

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
}) => {
  // Helper function to get default image based on page
  const getDefaultImage = (page) => {
    const defaultImages = [pic7];
    return defaultImages[page] || defaultImages[0];
  };
  // Helper Component for Image Display
  const ImageDisplay = ({ images, imagesUnsaved, page }) => {
    const imageSrc =
      images || (imagesUnsaved && images?.length > 0)
        ? images[page]
        : imagesUnsaved?.length > 0
        ? `data:image/jpeg;base64,${imagesUnsaved[page]}`
        : getDefaultImage(page);
    return (
      <div className="flex justify-center items-center relative">
    { loading && <div className="spinner w-full h-full absolute"></div> }
    { imageSrc &&  
    <Image
        alt=""
        style={{ borderRadius: "5px 5px 5px 5px", opacity: "0.85" }}
        width={650}
        height={650}
        src={imageSrc}
      /> }
      </div>
    );
  };

  const handlePage = (direction) => {
    let max = 5;
    let min = 0;
    if (direction === "down" && page > min) {
      setPage(page - 1);
    }
    else if (direction === "up" && page < max) {
      setPage(page + 1);
    }
  };
  

  return (
    <div className="fade-in sm:mt-4">
      <div
        className="lg:mx-[5%] xl:mx-[10%] border-r border-l-1 rounded-xl 
       bg-orange-200
       sm:bg-gradient-to-r from-orange-200 from-20% via-stone-700 via-50% to-orange-200 to-60% ..."
      >
        {/* Image Section */}
        <div className="border-r-2 border-l-1 rounded-xl border-stone-800 mx-auto sm:flex lg:skew-x-1 border">
          <div
            className="w-full h-full sm:w-1/2
        
          
             page wobble
              pb-4 flex-1 lg:pt-2 lg:ml-2 
             rounded-xl border-stone-700 border
             bg-gradient-to-r from-orange-200 from-20% via-orange-200 via-40% to-stone-700 to-90% ...
              shadow-lg border-b-2"
          >
            <div className="m-4  rounded-tl-xl rounded-bl-xl ">
              <ImageDisplay
                images={images}
                page={page}
                imagesUnsaved={imagesUnsaved}
              />
            </div>
          </div>

          {/* Text Section */}
          <div
            className="flex flex-col w-full sm:w-1/2 
                          pl-4 lg:pl-6 pt-6 pr-4
                          page wobble2
                         
                          bg-gradient-to-r from-stone-700 from-0% via-orange-200 via-25%  to-orange-200 to-90% ...
                          rounded lg:rounded-xl border rounded-tr-lg rounded-br-lg border-l-4 border-stone-700 ...
                           overflow-y-auto
                           text-stone-900 antiqua"
          >
            <div className="  lg:px-4 pb-4 text-stone-900  ">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold capitalize antiqua">
                {story
                  ? story?.split("Once")[0]
                  : storyUnsaved
                  ? storyUnsaved?.split("Once")[0]
                  : "Once Upon A Time..."}
              </h1>
            </div>

            {!story && !storyUnsaved ? (
              <StoryFiller loading={loading} />
            ) : story && !storyUnsaved ? (
              <div className="text-stone-900 xs:pr-4 lg:pr-0 lg:pl-4  text-2xl xl:text-3xl w-full h-50">
                {page == 0
                  ? "Once " + story?.substring(0, 450).split("Once")[1] + "..."
                  : page == 1
                  ? "..." + story?.substring(450, 900) + "..."
                  : page == 2
                  ? "..." + story?.substring(900, 1350) + "..."
                  : page == 3
                  ? "..." + story?.substring(1350, 1800) + "..."
                  : page == 4
                  ? "..." + story?.substring(1800, 2250) + "..."
                  : "..." + story?.substring(2250, 2700) + "..."}
              </div>
            ) : (
              <div className="text-stone-900 xs:pr-4 lg:pr-0 lg:pl-4  text-2xl xl:text-3xl w-full h-50">
                {page == 0
                  ? "Once " +
                    storyUnsaved?.substring(0, 450).split("Once")[1] +
                    "..."
                  : page == 1
                  ? "..." + storyUnsaved?.substring(450, 900) + "..."
                  : page == 2
                  ? "..." + storyUnsaved?.substring(900, 1350) + "..."
                  : page == 3
                  ? "..." + storyUnsaved?.substring(1350, 1800) + "..."
                  : page == 4
                  ? "..." + storyUnsaved?.substring(1800, 2250) + "..."
                  : "..." + storyUnsaved?.substring(2250, 2700) + "..."}
              </div>
            )}
            {/* </HTMLFlipBook> */}
            {/* Controls Section */}
            <div className="flex-1 flex items-end pb-6">
              <div className="w-full flex pr-4 lg:pr-0 ">
                <div className="w-1/2 text-left ">
                  {/* Audio Section */}
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
    className="px-4 py-1 mx-0 text-stone-950 bg-transparent rounded hover:bg-orange-400 shadow-lg border-2 border-stone-500"
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
            {/* Reset Button */}

            {/* <button
              onClick={resetStory}
              className=" text-stone-900 border-stone-500 border-2 bg-transparent h-8 w-8 rounded-full hover:bg-amber-500 shadow-xl"
            >
              x
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
