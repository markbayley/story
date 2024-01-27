"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ".//styles.css";

import Slider from "react-slick";

import flower from "../../public/pic1.jpg";
import fruit from "../../public/pic2.jpg";
import profile from "../../public/pic3.jpg";
import home from "../../public/home.png";

export default function StoryPage() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    if (audio && audioRef.current) {
      audioRef.current.play();
    }
  }, [audio]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Fetching a story based on the prompt
    const storyResponse = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const storyData = await storyResponse.json();
    setStory(storyData.story);

    // Fetching images based on the story
    const imageResponse = await fetch("/api/stability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story: storyData.story }),
    });
    const imageData = await imageResponse.json();
    setImages(imageData.images);

    // Fetching audio based on the story
    const audioResponse = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textInput: storyData.story }),
    });

    const arrayBuffer = await audioResponse.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const blobUrl = URL.createObjectURL(blob);
    setAudio(blobUrl);
  };

  const resetStory = () => {
    setStory("");
    setImages([]);
    setAudio("");
    setPrompt("");
  };

  const [carouselIndex, setCarouselIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => setCarouselIndex(next),
    arrows: true,
  };

  const carousel = (
    <div className="container xl:px-40 mx-auto flex  border ">
      <div className="w-full h-full lg:w-1/2  border">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="border-red-500 border-2">
              <Image src={`data:image/jpeg;base64,${img}`} alt="images" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto  border-1 bg-orange-200 ">
        <div className="  p-4 text-stone-900">
          <h1 className="text-4xl font-bold">{prompt ? prompt : "Tontomo"}</h1>
        </div>
        <p className="text-lg text-stone-900 px-4">
          {story
            ? story
            : "Once upon a time, in a small village nestled amongst rolling hills and babbling brooks, there lived a little girl named Lily. Lily was a bright and imaginative child who loved to dream and create stories in her mind. One sunny morning, as Lily ventured into the forest near her house, she stumbled upon a hidden path. Curiosity struck her, and she decided to follow it, not knowing where it would lead. The path twisted and turned..."}
        </p>
        <button
          onClick={resetStory}
          className="mt-4 mx-4 px-4 py-2 text-white bg-orange-400 rounded-full hover:bg-red-600"
        >
          Generate New Story
        </button>
      </div>

      {/* Audio Section */}
      {audio && (
        <div className="mb-4">
          <audio ref={audioRef} controls src={`${audio}`} className="w-full" />
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-[url('../../public/background.png')] bg-cover min-h-screen">
        {/* Status Bar */}
        <div className="text-white p-4 flex justify-between text-xs">
          <div>10:10 AM</div>
          <div>Signal</div>
        </div>

        {/* Content Card */}
        <div className="  ">
          {!story ? (
            <>
              <div className="flex justify-end lg:mr-6">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 lg:mr-6 rounded-xl  lg:w-1/3  "
                >
                  <div className=" text-orange-300 p-4">
                    <h1 className="text-4xl font-bold">Tontomo</h1>
                  </div>
                  <h3 className="flex justify-between px-4 text-gray-300 text-md">
                    {/* <div>Menu icon</div> */}
                    What do you want to be today? A brave knight, a beautiful
                    princess, or a daring astronaut zooming through space? Why
                    not all of them?
                    {/* <div>Notification icon</div> */}
                  </h3>
                  <div className="m-4 rounded-xl ">
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
                      className="p-2 w-full rounded-md border-gray-300 bg-gray-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 m-4 text-white bg-orange-300 rounded-full hover:bg-orange-400 "
                  >
                    Generate Story
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 m-2 text-white bg-blue-300 rounded-full hover:bg-blue-400 "
                  >
                    Back
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              {/* {carousel} */}

              <div className="">
                {story && (
                  <div className="">
                    {/* Images Section */}

                    <div className="container xl:px-40 mx-auto xl:flex  border ">
                      <div className="w-full h-full lg:w-1/2  border">
                        {/* <Slider {...settings}> */}
                          {images.length == 0 ? 

<div className="">

  <div  className="border rounded">
    <Image
      alt=""
      width={650}
      height={650}
      src={flower}
    />
  </div>
</div>

: 
                          
                          
                          images.length > 0 && (
                            <div className="">
                              {images.map((img, index) => (
                                <div key={index} className="border rounded">
                                  <Image
                                    alt=""
                                    width={650}
                                    height={650}
                                    src={`data:image/jpeg;base64,${img}`}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        {/* </Slider> */}
                      </div>

                      <div className="w-full lg:w-1/2 p-6 overflow-y-auto  border-1 bg-orange-200 ">
                        <div className="  p-4 text-stone-900">
                          <h1 className="text-4xl font-bold">
                            {prompt ? prompt : "Tontomo"}
                          </h1>
                        </div>
                        <p className="text-lg text-stone-900 px-4">
                          {story
                            ? story
                            : "Once upon a time, in a small village nestled amongst rolling hills and babbling brooks, there lived a little girl named Lily. Lily was a bright and imaginative child who loved to dream and create stories in her mind. One sunny morning, as Lily ventured into the forest near her house, she stumbled upon a hidden path. Curiosity struck her, and she decided to follow it, not knowing where it would lead. The path twisted and turned..."}
                        </p>
                        <button
                          onClick={resetStory}
                          className="mt-4 mx-4 px-4 py-2 text-white bg-orange-400 rounded-full hover:bg-red-600"
                        >
                          Generate New Story
                        </button>
                      </div>

                      {/* Story Section */}
                      {/* <div className="max-h-[40vh] overflow-y-auto mb-4 border-1">
                        <p className="text-lg text-white">
                          {story ? story : "Once upon a time..."}
                        </p>
                      </div> */}

                      {/* Audio Section */}
                      {/* {audio && (
                      <div className="mb-4">
                        <audio
                          ref={audioRef}
                          controls
                          src={`${audio}`}
                          className="w-full"
                        />
                      </div>
                    )} */}

                      {/* Reset Button */}
                      {/* <button
                      onClick={resetStory}
                      className="mt-4 px-4 py-2 text-white bg-orange-400 rounded-full hover:bg-red-600"
                    >
                      Generate New Story
                    </button> */}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0  p-4 flex justify-center gap-6 text-orange-300 bg-sky-950 text-sm opacity-90">
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
