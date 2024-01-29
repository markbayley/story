"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ".//styles.css";

import Slider from "react-slick";

import flower from "../../public/pic4.jpg";
import fruit from "../../public/pic5.jpg";
import profile from "../../public/pic6.jpg";
import home from "../../public/pic7.jpg";

export default function StoryPage() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState("");
  const audioRef = useRef(null);

  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState("Welcome");

  useEffect(() => {
    if (audio && audioRef.current) {
      audioRef.current.play();
    }
  }, [audio]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setClicked(true);
    console.log("main-prompt", prompt);
    // Fetching a story based on the prompt
    const storyResponse = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    setMessage("Creating Story");
    const storyData = await storyResponse.json();
    //setTitle(storyData.title);
    setStory(storyData.story);
    setMessage("Story Created");

    // Fetching images based on the story
    const imageResponse = await fetch("/api/stability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story: storyData.story }),
    });
    setMessage("Creating Image");
    const imageData = await imageResponse.json();
    setImages(imageData.images);
    setMessage("Image Created");

    // Fetching audio based on the story
    // const audioResponse = await fetch("/api/elevenlabs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ textInput: storyData.story }),
    // });

    // const arrayBuffer = await audioResponse.arrayBuffer();
    // const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    // const blobUrl = URL.createObjectURL(blob);
    // setAudio(blobUrl);
  };

  const resetStory = () => {
    setTitle("");
    setStory("");
    setImages([]);
    setAudio("");
    setPrompt("");
    setMessage("Reset");
  };

  // const [carouselIndex, setCarouselIndex] = useState(0);

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   beforeChange: (current, next) => setCarouselIndex(next),
  //   arrows: true,
  // };

  // const carousel = (
  //   <div className="container xl:px-40 mx-auto flex  border ">
  //     <div className="w-full h-full lg:w-1/2  border">
  //       <Slider {...settings}>
  //         {images.map((img, index) => (
  //           <div key={index} className="border-red-500 border-2">
  //             <Image src={`data:image/jpeg;base64,${img}`} alt="images" />
  //           </div>
  //         ))}
  //       </Slider>
  //     </div>
  //     <div className="w-full lg:w-1/2 p-6 overflow-y-auto  border-1 bg-orange-200 ">
  //       <div className="  p-4 text-stone-900">
  //         <h1 className="text-4xl font-bold">{prompt ? prompt : "Tontomo"}</h1>
  //       </div>
  //       <p className="text-lg text-stone-900 px-4">
  //         {story
  //           ? story
  //           : "Once upon a time, in a small village nestled amongst rolling hills and babbling brooks, there lived a little girl named Lily. Lily was a bright and imaginative child who loved to dream and create stories in her mind. One sunny morning, as Lily ventured into the forest near her house, she stumbled upon a hidden path. Curiosity struck her, and she decided to follow it, not knowing where it would lead. The path twisted and turned..."}
  //       </p>
  //       <button
  //         onClick={resetStory}
  //         className="mt-4 mx-4 px-4 py-2 text-white bg-orange-400 rounded-full hover:bg-red-600"
  //       >
  //         Generate New Story
  //       </button>
  //     </div>

  //     {/* Audio Section */}
  //     {audio && (
  //       <div className="mb-4">
  //         <audio ref={audioRef} controls src={`${audio}`} className="w-full" />
  //       </div>
  //     )}
  //   </div>
  // );

  const image0 = images[0];
  const image1 = images[1];
  const image2 = images[2];

  return (
    <>
      <div className="bg-[url('../../public/background.png')] bg-cover min-h-screen">
        {/* Status Bar */}
        <div className="text-white p-4 flex justify-between text-xs">
          <div>10:10 AM</div>
          <div>{message}</div>
        </div>

        {/* Content Card */}
        <div className="  ">
          {clicked ? (
            <>
              <div className="flex justify-end xs:mx-0 sm:mx-32  lg:mr-6">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 lg:mr-6 rounded-xl  lg:w-1/3 "
                >
                  <div className=" text-orange-300 p-4">
                    <h1 className="text-4xl font-bold">
                      {message ? message : "Welcome!"}
                    </h1>
                  </div>
                  <h3 className="flex justify-between px-4 text-gray-300 text-md">
                    {/* <div>Menu icon</div> */}
                    What do you want to be today? A brave knight, a beautiful
                    princess, or a daring astronaut zooming through space? Why
                    not all of them?
                    {/* <div>Notification icon</div> */}
                  </h3>
                  <div className="m-4 rounded-xl">
                    <label
                      htmlFor="prompt"
                      className="block text-sm py-2 font-small text-orange-300"
                    >
                      Create a story about...
                    </label>
                    <input
                      id="prompt"
                      type="text"
                      placeholder="A magical castle in the sky"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="p-2 w-full md:w-2/3 lg:w-full rounded-md border-gray-300 bg-gray-100 text-black"
                    />
                  </div>
                  <button
                    //onClick={() => setClicked(true)}
                    type="submit"
                    className="px-4 py-2 m-4 text-white bg-orange-300 rounded-full hover:bg-orange-400 "
                  >
                    {!clicked ? "Create Story" : "Creating..."}
                  </button>
                  {/* <button
                    type="submit"
                    className="px-4 py-2 m-2 text-white bg-blue-300 rounded-full hover:bg-blue-400 "
                  >
                    Back
                  </button> */}
                </form>
              </div>
            </>
          ) : (
            <>
              {/* {carousel} */}

              <div className="fade-in">
                {/* {clicked && ( */}
                <div className="">
                  {/* Images Section */}

                  <div className="container xl:px-36 mx-auto xl:flex ">
                    <div className="w-full h-full lg:w-1/2 ">
                      {/* <Slider {...settings}> */}
                      {images.length == 0 ? (
                        <div className="">
                          <div className="border-8 border-orange-200 rounded-tl-xl rounded-bl-xl">
                            <Image
                              alt=""
                              style={{
                                border: "5px",
                                borderRadius: "10px 0px 0px 10px",
                              }}
                              width={650}
                              height={650}
                              src={
                                page == 0
                                  ? home
                                  : page == 1
                                  ? fruit
                                  : page == 2
                                  ? profile
                                  : flower
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        images.length > 0 && (
                          <div className="">
                            {page === 0 && (
                              <div className="border-2">
                                <Image
                                  alt=""
                                  style={{
                                    border: "5px red",
                                    borderRadius: "10px 0px 0px 10px",
                                  }}
                                  width={650}
                                  height={650}
                                  src={`data:image/jpeg;base64,${images[0]}`}
                                />
                              </div>
                            )}
                            {page === 1 && (
                              <div className="">
                                <Image
                                  alt=""
                                  style={{ borderRadius: "10px 0px 0px 10px" }}
                                  width={650}
                                  height={650}
                                  src={fruit}
                                />
                              </div>
                            )}
                            {page === 2 && (
                              <div className="">
                                <Image
                                  alt=""
                                  style={{ borderRadius: "10px 0px 0px 10px" }}
                                  width={650}
                                  height={650}
                                  src={`data:image/jpeg;base64,${images[1]}`}
                                />
                              </div>
                            )}
                            {page === 3 && (
                              <div className="">
                                <Image
                                  alt=""
                                  style={{ borderRadius: "10px 0px 0px 10px" }}
                                  width={650}
                                  height={650}
                                  src={home}
                                />
                              </div>
                            )}
                            {page === 4 && (
                              <div className="">
                                <Image
                                  alt=""
                                  style={{ borderRadius: "10px 0px 0px 10px" }}
                                  width={650}
                                  height={650}
                                  src={`data:image/jpeg;base64,${images[2]}`}
                                />
                              </div>
                            )}
                            {page === 5 && (
                              <div className="">
                                <Image
                                  alt=""
                                  style={{
                                    border: "5px",
                                    borderRadius: "10px 0px 0px 10px",
                                  }}
                                  width={650}
                                  height={650}
                                  src={flower}
                                />
                              </div>
                            )}
                            {page === 6 && (
                              <div className="">
                                <Image
                                  alt=""
                                  style={{ borderRadius: "10px 0px 0px 10px" }}
                                  width={650}
                                  height={650}
                                  src={profile}
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>

                    <div className="w-full lg:w-1/2 p-6 overflow-y-auto text-stone-900  border-1 bg-orange-200 rounded-tr-lg rounded-br-lg">
                      <div className="  px-4 pb-4 text-stone-900">
                        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold capitalize">
                          {story
                            ? story.split("Once")[0]
                            : "Once Upon A Time..."}
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
                { (
                      <div className="mt-4">
                        <audio
                          ref={audioRef}
                          controls
                          src={`${audio}`}
                          className="w-full"
                          style={{height: "45px"}}
                        />
                      </div>
                    )}
                    </div>
               
                    {/* <p className="text-lg text-stone-900 px-4">
                        Creating your story... please wait{" "}
                      </p> */}
                  </div>
              
               
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0  px-5 flex justify-center gap-6 text-orange-300 bg-sky-950 text-sm opacity-90">
          <div className="bg-[url('../../public/home.png')] rounded bg-cover p-4 border"></div>
          <div className="bg-[url('../../public/fruit.png')] rounded bg-cover p-4 border"></div>
          <div className="bg-[url('../../public/flower.png')] rounded bg-cover p-4 border"></div>
          <div className="bg-[url('../../public/profile.png')] rounded bg-cover p-4 border"></div>
          <div className="bg-[url('../../public/profile.png')] rounded bg-cover p-4 border"></div>
        </div>
      </div>
    </>
  );
}
