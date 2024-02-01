export const StoryForm = ({
  prompt,
  setPrompt,
  handleSubmit,
  message,
  setLoading,
  loading,
  setOpen,
  story,
}) => {
  return (
    <div className="flex justify-end xs:mx-0 sm:mx-32 lg:mr-6">
      <form
        onSubmit={handleSubmit}
        className="p-2 lg:mr-6 rounded-xl lg:w-1/3 "
      >
        {/* Form content here... */}

        <div className=" text-orange-300 p-4">
          <h1 className="font-bold antiqua text-5xl ">Welcome</h1>
        </div>
        <h3 className="flex justify-between px-4 text-gray-300 text-md roboto font-light">
          {/* <div>Menu icon</div> */}
          Create stories with AI. <br /><br />
          What do you want to read about? A friendly dinosaur? A beautiful princess in a castle?
          {/* <div>Notification icon</div> */}
        </h3>

        <div className="m-4 rounded-xl">
          <label
            htmlFor="prompt"
            className="block text-sm py-2 font-small text-orange-300"
          >
            {message ? message : "Create a story about..."}
          </label>
          <input
            id="prompt"
            type="text"
            placeholder="A magical castle in the sky"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="p-2 w-full md:w-2/3 lg:w-full rounded-md border-gray-300 bg-gray-100 text-black "
          />
        </div>
        <h4 className="flex justify-between px-4 text-gray-300 text-xs mt-3">
          {/* <div>Menu icon</div> */}
          Buy credits to generate amazing storybook images!
          {/* <div>Notification icon</div> */}
        </h4>

        {loading ? (
          <button className="px-4 py-2 m-4 text-stone-950 bg-orange-300 rounded-full hover:bg-orange-400">
            Creating Story...
          </button>
        ) : prompt ? (
          <button
            type="submit"
            className="px-4 py-2 m-4 text-stone-950 bg-orange-300 rounded-full hover:bg-orange-400"
          >
            Create Story
          </button>
        ) : (
          ""
        )}

        {story ? (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 m-4 text-stone-950 bg-blue-300 rounded-full hover:bg-orange-400"
          >
            Open Story
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
