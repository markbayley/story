"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ".//styles.css";

import Slider from 'react-slick';

import flower from "../../public/flower.png";
import fruit from "../../public/fruit.png";
import profile from "../../public/profile.png";
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
    arrows: false,
  };




  return (
    <>
    {/* <DynamicBackground imageUrl={ story ? Image1 : 'hello'} /> */}
      <div className="bg-[url('../../public/background.png')] bg-cover min-h-screen">
        {/* Status Bar */}
        <div className="text-white p-4 flex justify-between text-xs">
          <div>10:10 AM</div>
          <div>Signal</div>
        </div>

        {/* Header Icons */}
        {/* <div className="flex justify-between p-4">
          <div>Menu icon</div>
          <div>Notification icon</div>
        </div> */}

        {/* Main Title */}
      

        {/* Content Card */}
        <div className="my-1  py-2">
          <div className="flex justify-end lg:mr-6">
            {!story ? (
              <>
               
          
                <form
                  onSubmit={handleSubmit}
                  className="p-2 lg:mr-6 rounded-xl  lg:w-1/3  "
                >
                    <div className=" text-orange-300 p-4">
          <h1 className="text-4xl font-bold">Tontomo</h1>
        </div>
           <h3 className="flex justify-between px-4 text-gray-300 text-md">
          {/* <div>Menu icon</div> */}
          What do you want to be today? A brave knight, a beautiful princess, or a daring astronaut zooming through space? Why not all of them?
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
              </>
            ) : (
              <div className="flex flex-col items-center bg-sky-950 rounded">
                {story && (
                  <div className="p-2 text-white rounded shadow-md w-full max-w-2xl">
                    {/* Images Section */}

                    <Slider {...settings}>
  
    </Slider>



                    {images.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {images.map((img, index) => (
                          <div key={index} className="border rounded">
                            {/* Replace with actual Image component */}
                            <Image
                              alt=""
                              // width={512}
                              // height={512}
                               width={300}
                               height={300}
                             //layout="fill"
                              src={`data:image/jpeg;base64,${img}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Story Section */}
                    <div className="max-h-[40vh] overflow-y-auto mb-4 border-1">
                      <p className="text-lg text-white">
                        {story ? story : "Once upon a time..."}
                      </p>
                    </div>

                    {/* Audio Section */}
                    {audio && (
                      <div className="mb-4">
                        <audio
                          ref={audioRef}
                          controls
                          src={`${audio}`}
                          className="w-full"
                        />
                      </div>
                    )}

                    {/* Reset Button */}
                    <button
                      onClick={resetStory}
                      className="mt-4 px-4 py-2 text-white bg-orange-400 rounded-full hover:bg-red-600"
                    >
                      Generate New Story
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
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
