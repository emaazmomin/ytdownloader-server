import express from "express";
import ytdl from "ytdl-core";
import cors from "cors";
const app = express();
const port = 5000 || process.env.PORT;
var progress = {};
app.use(cors());

const getProggress = (data, res) => {
  // return progress;
  progress = data;
  res.send(progress);
};
app.get("/download", async (req, res) => {
  try {
    const videoURL = req.query.url;

    // Check if the provided URL is a valid YouTube video URL
    if (!ytdl.validateURL(videoURL)) {
      return res.status(400).json({ error: "Invalid YouTube video URL" });
    }
    const videoStream = ytdl(videoURL, { format: "mp4" });
    videoStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
