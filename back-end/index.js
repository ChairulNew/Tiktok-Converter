import express from "express";
import axios from "axios";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Buat folder `downloads` jika belum ada
const downloadPath = path.join(__dirname, "downloads");

if (!fs.existsSync(downloadPath)) {
  fs.mkdirSync(downloadPath);
}

// Fungsi untuk mengonversi URL pendek ke URL asli
async function getOriginalUrl(shortUrl) {
  try {
    const response = await axios
      .get(shortUrl, { maxRedirects: 0 })
      .catch((err) => err.response);
    return response.headers?.location || null;
  } catch (error) {
    console.error("Gagal mengonversi URL pendek:", error.message);
    return null;
  }
}

// Endpoint untuk download video TikTok
app.get("/api/download-tiktok", async (req, res) => {
  let { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Link tidak valid." });
  }

  // Tangani URL pendek TikTok
  if (url.includes("vt.tiktok.com") || url.includes("vm.tiktok.com")) {
    const originalUrl = await getOriginalUrl(url);
    if (!originalUrl) {
      return res
        .status(400)
        .json({ error: "Gagal mengonversi URL pendek ke URL asli." });
    }
    url = originalUrl;
  }

  // Bersihkan URL TikTok dari karakter tambahan
  url = url.split("?")[0];

  try {
    const response = await axios.get(`https://api.tikdown.org/get?url=${url}`, {
      timeout: 15000,
    });

    const videoUrl = response.data?.data?.play;
    if (!videoUrl) {
      return res.status(404).json({ error: "Video tidak ditemukan." });
    }

    const videoPath = path.join(downloadPath, `video_${Date.now()}.mp4`);
    const writer = fs.createWriteStream(videoPath);

    const videoResponse = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
    });

    videoResponse.data.pipe(writer);

    writer.on("finish", () => {
      res.json({ message: "Video berhasil diunduh!", filePath: videoPath });
    });

    writer.on("error", (err) => {
      res.status(500).json({ error: "Gagal menyimpan video." });
    });
  } catch (error) {
    console.error("Error saat mengunduh video:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
