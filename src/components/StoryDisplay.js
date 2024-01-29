import Image from "next/image";

import pic7 from "/public/pic7.jpg"

export const StoryDisplay = ({
  story,
  images,
  page,
  setPage,
  resetStory,
  audio,
  audioRef,
}) => {
  // Helper function to get default image based on page
  const getDefaultImage = (page) => {
    const defaultImages = [
      pic7,
    ];
    return defaultImages[page] || defaultImages[0];
  };
  // Helper Component for Image Display
  const ImageDisplay = ({ images, page }) => {
    const imageSrc =
      images.length > 0
        ? `data:image/jpeg;base64,${images[page]}`
        : getDefaultImage(page);
    return (
      <Image
        alt=""
        style={{ borderRadius: "10px 0px 0px 10px" }}
        width={650}
        height={650}
        src={imageSrc}
      />
    );
  };

  return (
    <div className="fade-in">
      <div className="">
        {/* Images Section */}

        <div className="container xl:px-36 mx-auto xl:flex ">
          <div className="w-full h-full lg:w-1/2 ">
            <div className="border-8 border-orange-200 rounded-tl-xl rounded-bl-xl">
              <ImageDisplay images={images} page={page} />
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-6 overflow-y-auto text-stone-900  border-1 bg-orange-200 rounded-tr-lg rounded-br-lg">
            <div className="  px-4 pb-4 text-stone-900">
              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold capitalize">
                {story ? story.split("Once")[0] : "Once Upon A Time..."}
              </h1>
            </div>

            {!story && (
              <div className=" shadow rounded-md px-4 md:max-w-md lg:max-w-xl w-full">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="animate-pulse flex space-x-4">
                  {/* <div class="rounded-full bg-slate-700 h-10 w-10"></div> */}
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="animate-pulse flex space-x-4">
                  {/* <div class="rounded-full bg-slate-700 h-10 w-10"></div> */}
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="animate-pulse flex space-x-4">
                  {/* <div class="rounded-full bg-slate-700 h-10 w-10"></div> */}
                  <div className="flex-1 space-y-6 py-1">
                    {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        {/* <div class="h-2 bg-slate-700 rounded col-span-2"></div> */}
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-stone-900 px-4  text-xl max-w-smd w-full">
              {page == 0 && story
                ? story.substring(0, 450).split("Once")[1] + "..."
                : page == 1
                ? " ..." + story.substring(450, 900) + "...."
                : page == 2
                ? " ..." + story.substring(900, 1350) + "..."
                : page == 3
                ? " ..." + story.substring(1350, 1800) + "..."
                : page == 4
                ? " ..." + story.substring(1800, 2250) + "..."
                : page == 5
                ? " ..." + story.substring(2250, 2700) + "..."
                : " ..." + story.substring(2700, 3150)}
            </div>

            <div className="w-full h-fit flex">
              <div className="w-1/3 text-left">
                {/* Reset Button */}
                <button
                  onClick={resetStory}
                  className="mt-4 px-4 py-2 text-white bg-orange-400 rounded-full hover:bg-red-600"
                >
                  Close
                </button>
              </div>

              <div className="w-2/3 text-right">
                <button
                  onClick={() => setPage(page - 1)}
                  className="mt-3 px-4 py-2 text-white bg-blue-300 rounded-lg hover:bg-blue-400 shadow-lg"
                >
                  {"<"}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 m-2 text-white bg-blue-300 rounded-lg hover:bg-blue-400 shadow-lg"
                >
                  {"Page " + page}
                </button>

                <button
                  onClick={() => setPage(page + 1)}
                  type="submit"
                  className="px-4 py-2  text-white bg-blue-300 rounded-lg hover:bg-blue-400 shadow-lg "
                >
                  {">"}
                </button>
              </div>
            </div>
            {/* Audio Section */}
            {
              <div className="mt-4">
                <audio
                  ref={audioRef}
                  controls
                  src={`${audio}`}
                  className="w-full"
                  style={{ height: "45px" }}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
