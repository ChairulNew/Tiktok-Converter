import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.post("/api/convert", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Link tidak valid." });

  try {
    const response = await axios.get(`https://www.tikwm.com/api/?url=${url}`);
    if (response.data && response.data.data && response.data.data.play) {
      return res.json({ videoUrl: response.data.data.play });
    } else {
      return res.status(404).json({ error: "Video tidak ditemukan." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
