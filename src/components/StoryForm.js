export const StoryForm = ({ prompt, setPrompt, handleSubmit, message }) => {
    return (
      <div className="flex justify-end xs:mx-0 sm:mx-32  lg:mr-6">
        <form onSubmit={handleSubmit} className="p-2 lg:mr-6 rounded-xl  lg:w-1/3 ">
          {/* Form content here... */}

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

          <button type="submit" className="px-4 py-2 m-4 text-white bg-orange-300 rounded-full hover:bg-orange-400">
            Create Story
          </button>
        </form>
      </div>
    );
  };
  