import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setisImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setLoading(true);
      const image = await generateImage(input.trim());
      if (image) {
        setisImageLoaded(true);
        setImage(image);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s}" : "w-0"
            }`}
          />
        </div>
        <p className={!loading ? "hidden" : ""}>Loading...</p>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 color-placeholder bg-transparent outline-none ml-8 max-sm:w-20"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`px-10 sm:px-16 py-3 rounded-full 
            ${
              !input.trim() || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-zinc-900 text-white cursor-pointer"
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setisImageLoaded(false);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 rounded-full py-3 cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 cursor-pointer rounded-full"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
