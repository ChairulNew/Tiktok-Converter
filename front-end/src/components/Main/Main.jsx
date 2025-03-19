import { useState } from "react";
import axios from "axios";

function App() {
  const [link, setLink] = useState("");
  const [filePath, setFilePath] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!link) {
      setError("Silakan masukkan link TikTok terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/api/download-tiktok?url=${link}`
      );
      setFilePath(response.data.filePath);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.error || "Terjadi kesalahan saat mengunduh video."
      );
      setFilePath("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">TikTok Video Downloader</h1>

      <input
        type="text"
        placeholder="Masukkan link TikTok..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full max-w-md p-2 border rounded mb-4"
      />

      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Download Video
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {filePath && (
        <div className="mt-4">
          <p>✅ Video berhasil diunduh!</p>
          <p>
            📂 Disimpan di: <strong>{filePath}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
