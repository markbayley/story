import SignIn from "@/app/auth/sign-in";
import {
  BookOpenIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const StoryForm = ({
  prompt,
  setPrompt,
  handleSubmit,
  setMessage,
  loading,
  handleOpen,
  storyUnsaved
}) => {
  return (
    <div className="flex justify-start font-inter w-full sm:w-[60vw] lg:w-[36vw]">
      <form onSubmit={handleSubmit} className="mt-2 rounded-xl">
        <div className=" text-orange-300 px-4 pb-4">
          <h1 className="font-bold font-antiqua text-5xl ">Storyteller AI</h1>
        </div>
        <h3 className=" px-4 text-gray-300 text-md font-light">
        Create stories with AI. What do you want to read about? 
          {/* <a onClick={() => setPrompt("A boy with a nervous pet dinosaur")}>
            {" "}
            A boy with a nervous pet dinosaur?{" "}
          </a> */}
          <a onClick={() => setPrompt("A lonely princess and a frog prince")}>
            {" "}
            A lonely princess and a wise frog prince?{" "}
          </a>
          <a onClick={() => setPrompt("A castle in the clouds")}>
            {" "}
            A castle in the clouds?{" "}
          </a>
       
        </h3>
        <div className="flex items-center justify-center ">
          <hr className="h-px my-4 bg-yellow-700 border-0 dark:bg-yellow-600 w-2/5" />{" "}
          <SparklesIcon className="h-6 w-6 mx-4 text-yellow-700" />{" "}
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-yellow-600 w-2/5" />
        </div>
        <div className="mx-4 rounded-xl">
          <label
            htmlFor="prompt"
            className="block text-md py-2  text-orange-300"
          >
            {"Create a story about..."}
          </label>
          <input
            id="prompt"
            type="text"
            placeholder="A magical castle in the sky"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value), setMessage("");
            }}
            className="w-full  p-2   rounded outline-none text-black placeholder-gray-500 bg-white text-[16px]"
          />
        </div>
        {/* <h4 className="flex justify-between px-4 text-gray-300 text-xs pt-3">
          Buy credits to generate amazing storybook images!
        </h4> */}
        <div className="flex text-[15px]">
          {loading ? (
            <button
              type="submit"
              className={
                "w-full text-white px-4 py-2 m-4  rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center  border-stone-700"
              }
            >
              Creating...
              <PaintBrushIcon className="h-6 w-6 mx-2" />
            </button>
          ) : (
            <button
              type="submit"
              className={
                "w-full text-white px-4 py-2 m-4 font-sans rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center  border-stone-700"
              }
            >
              Create
              <PaintBrushIcon className="h-6 w-6 mx-2" />
            </button>
          )}
{ storyUnsaved &&
          <button
            onClick={handleOpen}
            className={
              "w-full text-white px-4 py-2 m-4 font-inter rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center  border-stone-700"
            }
          >
            View
            <BookOpenIcon className="h-6 w-6 mx-2" />
          </button>
}
        </div>
      </form>
      {/* <SignIn /> */}
    </div>
  );
};
