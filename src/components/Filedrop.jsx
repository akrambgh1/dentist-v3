import { useState } from "react";
import { ArrowRight } from "lucide-react";


export default function FileUploader() {
  const [files, setFiles] = useState([]);


  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  return (
    <div className="flex flex-col items-start">
        <button
          className="px-8 py-2 bg-[#181940] text-white rounded-[10px] shadow-md hover:bg-blue-600 transition"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <ArrowRight />
        </button>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Display Selected Files */}
      {files.length > 0 && (
        <ul className="mt-4">
          {files.map((file, index) => (
            <li key={index} className="text-sm text-gray-700">
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
