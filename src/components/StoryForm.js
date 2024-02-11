import SignIn from "@/app/sign-in/page";
import {
  BookOpenIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const StoryForm = ({
  prompt,
  setPrompt,
  handleSubmit,
  message,
  setMessage,
  loading,
  setOpen,
  story,
  handleOpen
}) => {
  return (
    <div className="flex justify-center xl:justify-between xs:mx-0 sm:mx-32 lg:mr-6 font-inter">
      <form
        onSubmit={handleSubmit}
        className="mt-2 lg:mr-6 rounded-xl lg:w-3/4 xl:w-1/3  "
      >
        <div className=" text-orange-300 px-4 pb-4">
          <h1 className="font-bold font-antiqua text-5xl ">Storyteller AI</h1>
        </div>
        <h3 className=" px-4 text-gray-300 text-md font-light">
          What do you want to read about?
          <a onClick={() => setPrompt("A boy with a nervous pet dinosaur")}>
            {" "}
            A boy with a nervous pet dinosaur?{" "}
          </a>
          <a onClick={() => setPrompt("A lonely princess and a frog prince")}>
            {" "}
            A lonely princess and a wise frog prince?{" "}
          </a>
          <a onClick={() => setPrompt("A castle in the clouds")}>
            {" "}
            A castle in the clouds?{" "}
          </a>
          Your imagination is limitless!
        </h3>
        <div className="flex items-center pl-4">
          <hr className="h-px my-4 bg-yellow-700 border-0 dark:bg-yellow-600 w-2/5" />{" "}
          <SparklesIcon className="h-6 w-6 mx-2 text-yellow-700"/>{" "}
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
              setPrompt(e.target.value),
              setMessage("")
            }}
            className="p-2 w-full rounded-md border-gray-600 border text-[15px]"
          />
        </div>
        <h4 className="flex justify-between px-4 text-gray-300 text-xs pt-3">
          Buy credits to generate amazing storybook images!
        </h4>
        <div className="flex text-[15px]">
          {loading ? (
            <button className="px-4 py-2 m-4 text-stone-950 bg-orange-300 rounded-full hover:bg-orange-400 ">
              Creating Story...
            </button>
          ) : (
            <button
              type="submit"
              className={"w-full text-white px-4 py-2 m-4  rounded bg-indigo-600 hover:bg-indigo-500 flex justify-center border-b-2 border-stone-700"}
                        
            >
              Create
              <PaintBrushIcon className="h-6 w-6 mx-2" />
            </button>
          )}
     { story &&
            <button
              onClick={handleOpen}
              className="px-4 py-2 m-4 text-stone-950 bg-blue-300 rounded-full hover:bg-blue-400 flex border-b-2 border-stone-700"
            >
              Open
              <BookOpenIcon className="h-6 w-6 mx-2" />
            </button>
}
     
        </div>
       
      </form>
      {/* <SignIn /> */}
    
    </div>
  );
};
