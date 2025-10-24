import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expiration, setExpiration] = useState(600); // Default: 10 min
  const [link, setLink] = useState("");

  const handleFileChange = e => setSelectedFile(e.target.files[0]);

  const handleUpload = async e => {
    e.preventDefault();
    if (!selectedFile) return alert("No file selected.");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("expiration", expiration);

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setLink(data.link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <div className="max-w-sm w-full mx-auto p-8 rounded-2xl shadow-2xl border border-blue-200 bg-white backdrop-blur transition duration-300">
        <h2 className="text-3xl text-center font-bold mb-8 tracking-wide text-blue-700 drop-shadow">QuickDrop</h2>
        <form onSubmit={handleUpload} className="space-y-6">
          <input
            type="file"
            className="block w-full py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none transition"
            onChange={handleFileChange}
          />
          <label className="flex items-center text-gray-700 font-medium">
            Expiration:
            <select
              className="ml-3 px-3 py-2 border border-purple-300 rounded-lg bg-purple-50 focus:border-purple-500 text-purple-700 transition"
              onChange={e => setExpiration(e.target.value)}
            >
              <option value={600}>10 min</option>
              <option value={3600}>1 hour</option>
              <option value={86400}>24 hours</option>
            </select>
          </label>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold shadow hover:scale-105 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 transition-all"
          >
            Upload & Get Link
          </button>
        </form>
        {link && (
          <div className="mt-10 p-5 bg-gradient-to-l from-green-50 to-green-100 rounded-lg border border-green-400 shadow-inner">
            <h4 className="font-bold text-green-800 mb-2">Your Link:</h4>
            <a
              href={link}
              className="text-blue-700 underline break-all font-mono hover:text-blue-900 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {window.location.origin + link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;