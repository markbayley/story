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
  loading,
  setOpen,
  story,
  handleOpen
}) => {
  return (
    <div className="flex justify-center xl:justify-end xs:mx-0 sm:mx-32 lg:mr-6">
      <form
        onSubmit={handleSubmit}
        className="p-2 lg:mr-6 rounded-xl lg:w-3/4 xl:w-1/3 "
      >
        <div className=" text-orange-300 px-4 pb-4">
          <h1 className="font-bold antiqua text-5xl ">Storyteller AI</h1>
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
          <SparklesIcon className="h-6 w-6 mx-2 text-yellow-700" />{" "}
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-yellow-600 w-2/5" />
        </div>
        <div className="mx-4 rounded-xl">
          <label
            htmlFor="prompt"
            className="block text-sm py-2 font-small text-orange-300"
          >
            {"Create a story about..."}
          </label>
          <input
            id="prompt"
            type="text"
            placeholder="A magical castle in the sky"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="p-2 w-full rounded-md border-gray-600 border bg-sky-950 text-white"
          />
        </div>
        <h4 className="flex justify-between px-4 text-gray-300 text-xs mt-3">
          Buy credits to generate amazing storybook images!
        </h4>
        <div className="flex">
          {loading ? (
            <button className="px-4 py-2 m-4 text-stone-950 bg-orange-300 rounded-full hover:bg-orange-400">
              Creating Story...
            </button>
          ) : (
            <button
              type="submit"
              className={ prompt.length > 10 ? "px-4 py-2 m-4 text-stone-950 bg-orange-300 rounded-full hover:bg-orange-400 flex border-b-2 border-stone-700"
                         : "px-4 py-2 m-4 text-stone-950 bg-gray-500 rounded-full hover:bg-gray-400 flex border-b-2 border-stone-700" }
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
    </div>
  );
};
