import React from "react";
import { Mic, Send } from "lucide-react";

const PromptInput = () => {
  return (
    <div className="mx-auto w-full md:w-2/3 p-4 bg-white rounded-md shadow flex flex-col md:flex-row items-center gap-2">
      <input
        type="text"
        placeholder="Enter Prompt here"
        className="flex-1 border px-4 py-2 rounded focus:outline-none"
      />
      <button className="text-blue-600 hover:underline">Get Suggestions</button>
      <Mic className="text-blue-600 cursor-pointer" />
      <Send className="text-blue-600 cursor-pointer" />
    </div>
  );
};

export default PromptInput;